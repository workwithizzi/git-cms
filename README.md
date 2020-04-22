## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .env

1. Rename `example.env` &rarr; `.env`.
2. Specify `GITHUB_PRIVATE_TOKEN` at `.env` file.
3. The token can be generated at `https://github.com/settings/tokens`
4. [Instruction on how to generate a token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) for a reference.

## The Data Flow

- During SSR:
1. GET `limber.yml` file.
2. GET files from the `limber/` folder, based on the `config_path`, received at `step 1`.
3. GET content of the files from the `limber/` folder, based on the `file.path`, received at `step 2`.
