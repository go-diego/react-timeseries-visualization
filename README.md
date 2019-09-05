# Notes

- Tests are written with [React Testing Library](https://github.com/testing-library/react-testing-library). `npm test` will run them.
- `npm start` will run the project on port `8000`, as specified in `.env`.
- Alternatively, I included a docker command where:
  - `npm run docker:build` will create the image
  - `npm run docker:run` will run it

# Demo

I made available a live demo of the project. It can be found at [https://cleanspark-demo.netlify.com](https://cleanspark-demo.netlify.com). Since the provided APIs aren't served over HTTPS, I couldn't use them for the demo. However, I deployed an Express project that proxies these APIs just so that the demo would work. If interested, the implementation can be found at [https://github.com/go-diego/cleanspark-now](https://github.com/go-diego/cleanspark-now).
