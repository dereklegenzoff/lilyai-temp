import { Card, CardMedia } from '@mui/material';

const ProductImage = ({ url }) => (
    <Card
        style={{
            width: '25vw',
            border: '1px solid #eee',
            background: '#ffffff',
            boxShadow: '0px 2px 15px rgba(60, 64, 67, 0.2)',
            borderRadius: '26px',
            padding: '30px',
        }}
    >
        <CardMedia component="img" src={url} alt="product" />
    </Card>
);

export default ProductImage;
