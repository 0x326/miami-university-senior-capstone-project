[Node.js]: https://nodejs.org/en/docs/
[TypeScript]: https://www.typescriptlang.org/
[Jest]: https://jestjs.io/
[goldbergyoni/nodebestpractices]: https://github.com/goldbergyoni/nodebestpractices

# scale-interface

## Usage

```bash
cd miami-university-senior-capstone-project/
cd packages/scale-interface/

# Building code
yarn build

# Running code
yarn start

# Testing code
yarn test

# Linting code
yarn lint

# Fixing lint errors
yarn lint --fix
```

## Technologies

- Runtime environment: [Node.js]
- Static type checking: [TypeScript]
- Unit test framework: [Jest]

## Resources

> See also the 'Reference material' section in [`CONTRIBUTING.md`](../../CONTRIBUTING.md)

- Node.js best practices: [goldbergyoni/nodebestpractices]

## Experiment file naming convention

To make certain operations quicker, we can encode certain information in file names
so that we don't have to open an experiment file to test whether it matches a query.

Proposed format: `<experimentName>_<dateInitialized>_<primaryExperimenter>`

We should also store active experiments in an /active dir and archived experiments in
a `archive/` dir
