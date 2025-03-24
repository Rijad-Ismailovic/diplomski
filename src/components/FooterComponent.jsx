import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FooterComponent() {
  return (
    <footer className="py-4 bg-dark ">
      <Container>
        <p className="m-0 text-center text-white small ">
          <small>
            <Link
              className="text-white link-offset-3"
              href="https://github.com/Rijad-Ismailovic"
              target="_blank"
            >
              github.com/Rijad-Ismailovic
            </Link>
          </small>
        </p>
      </Container>
    </footer>
  );
}

export default FooterComponent