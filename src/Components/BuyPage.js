import React, { useEffect, useState } from "react";
import Axios from "axios";
import { random, commerce } from "faker";
import { Container, Col, Row } from "reactstrap";
import CartItem from "./cartItem";

// const apiKey = "INSERT_YOUR_KEY_HERE";

// const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";

const localUrl = "https://myjson.dit.upm.es/api/bins/4dnl";

const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  // const fetchPhotos = async () => {
  //   const response = await Axios.length(url, {
  //     header: {
  //       Authorization: apiKey,
  //     },
  //   });

  const fetchPhotos = async () => {
    const { data } = await Axios.get(localUrl, {});

    const { photos } = data;

    const allProduct = photos.map((photo) => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: random.word(),
      productPrice: commerce.price(),
      id: random.uuid(),
    }));

    setProduct(allProduct);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-success text-center">Buy Page</h1>
      <Row>
        {product.map((product) => (
          <Col md={4} key={product.id}>
            <CartItem addInCart={addInCart} product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;
