const { SearchClient, AzureKeyCredential } = require('@azure/search-documents');

const indexName = process.env.SearchIndexName;
const apiKey = process.env.SearchApiKey;
const searchServiceName = process.env.SearchServiceName;
const semanticConfiguration = process.env.SemanticConfiguration;

// Create a SearchClient to send queries
const client = new SearchClient(`https://` + searchServiceName + `.search.windows.net/`, indexName, new AzureKeyCredential(apiKey));

// creates filters in odata syntax
const createFilterExpression = (filterList, facets) => {
    let i = 0;
    const filterExpressions = [];

    const facetNames = Object.keys(facets);

    if (filterList.length > 0) {
        facetNames.forEach((facetName) => {
            // get the filters for this facet
            const filters = filterList.filter(function (obj) {
                return obj.field === facetName;
            });

            if (facets[facetName] === 'array') {
                const values = [];
                while (i < filters.length) {
                    values.push(filters[i].value);
                    i += 1;
                }
                if (values.length > 0) {
                    filterExpressions.push(`${facetName}/any(t: search.in(t, '${values.join(',')}', ','))`);
                }
            } else {
                const subFilters = [];
                while (i < filters.length) {
                    subFilters.push(`${facetName} eq '${filters[i].value}'`);
                    i += 1;
                }
                if (subFilters.length > 0) {
                    const fullExpression = '(' + subFilters.join(' or ') + ')';
                    filterExpressions.push(fullExpression);
                }
            }
            i = 0;
        });
    }
    return filterExpressions.join(' and ');
};

// reads in facets and gets type
// array facets should include a * at the end
// this is used to properly create filters
const readFacets = (facetString) => {
    const facets = facetString.split(',');
    const output = {};
    facets.forEach(function (f) {
        if (f.indexOf('*') > -1) {
            output[f.replace('*', '')] = 'array';
        } else {
            output[f] = 'string';
        }
    });

    return output;
};

module.exports = async function (context, req) {
    //context.log(req);

    try {
        // Reading inputs from HTTP Request
        let q = req.query.q || (req.body && req.body.q);
        const top = req.query.top || (req.body && req.body.top);
        const skip = req.query.skip || (req.body && req.body.skip);
        const filters = req.query.filters || (req.body && req.body.filters);
        const isSemantic = req.query.isSemantic || (req.body && req.body.isSemantic);
        const isLilyAI = req.query.isLilyAI || (req.body && req.body.isLilyAI);
        const facets = readFacets(process.env.SearchFacets);
        const facetsLilyAI = readFacets(process.env.SearchFacetsLilyAI);
        const searchFields = process.env.SearchFields.split(',');
        const searchFieldsLilyAI = process.env.SearchFieldsLilyAI.split(',');
        const searchQueryLanguage = req.query.searchQueryLanguage || (req.body && req.body.searchQueryLanguage);
        //context.log(searchQueryLanguage);
        //context.log(isLilyAI);

        // If search term is empty, search everything
        if (!q || q === '') {
            q = '*';
        }

        // Creating SearchOptions for query
        let searchOptions;
        if (isSemantic & (q !== '*')) {
            searchOptions = {
                top: top,
                skip: skip,
                includeTotalCount: true,
                facets: isLilyAI ? Object.keys(facetsLilyAI) : Object.keys(facets),
                filter: isLilyAI ? createFilterExpression(filters, facetsLilyAI) : createFilterExpression(filters, facets),
                queryType: 'semantic',
                //speller: "lexicon",
                queryLanguage: searchQueryLanguage || 'en-us',
                answers: 'extractive|count-3',
                semanticConfiguration: semanticConfiguration,
                searchFields: isLilyAI ? searchFieldsLilyAI : searchFields,
            };
            if (searchOptions.queryLanguage == 'en-US') {
                searchOptions.speller = 'lexicon';
            }
        } else {
            searchOptions = {
                top: top,
                skip: skip,
                includeTotalCount: true,
                facets: isLilyAI ? Object.keys(facetsLilyAI) : Object.keys(facets),
                filter: isLilyAI ? createFilterExpression(filters, facetsLilyAI) : createFilterExpression(filters, facets),
                searchFields: isLilyAI ? searchFieldsLilyAI : searchFields,
            };
        }

        // Sending the search request
        const searchResults = await client.search(q, searchOptions);

        // Getting results for output
        const output = [];
        for await (const result of searchResults.results) {
            output.push(result);
        }

        // Logging search results
        //context.log(searchResults.count);

        // Creating the HTTP Response
        context.res = {
            // status: 200, /* Defaults to 200 */
            headers: {
                'Content-type': 'application/json',
            },
            body: {
                count: searchResults.count,
                results: output,
                facets: searchResults.facets,
                answers: searchResults.answers,
            },
        };
    } catch (error) {
        context.log.error(error);

        // Creating the HTTP Response
        context.res = {
            status: 400,
            body: {
                innerStatusCode: error.statusCode || error.code,
                error: error.details || error.message,
            },
        };
    }
};
