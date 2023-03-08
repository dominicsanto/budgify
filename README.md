# Budgify - budget-web-app

A web app showcasing how Prporgrammable Bbanking can be used to gain insight into your spending habits and help you budget.

![Dashboard](/docs/dashboard.png)

## Requirements

- Terminal Application
  - [MAC](https://support.apple.com/en-za/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac)
  - [Windows](https://www.youtube.com/watch?v=EqaEPL9ZKGA)
- Node installed on your machine [See this guide on how to install](https://kinsta.com/blog/how-to-install-node-js/)
- Access to the [Investec Programmable Banking API](https://developer.investec.com/za/home)

## Preparations

You will need to have your Investec API keys at hand.
Specifically, your client ID, client secret and API key. You can learn more about Investec API keys in the [quick start guide](https://offerzen.gitbook.io/programmable-banking-community-wiki/developer-tools/quick-start-guide#how-to-get-your-api-keys).

## Getting Started

You must fork this repository to your Github account. This allows you to easily stay up to date with new changes to the widget without losing your local customizations to it. Once you have forked the repo, please clone it.

Open your terminal and run the following:

```bash
git clone https://github.com/dominicsanto/budgify.git
Rename the `.env.local.example` to `.env.local`
```

Then run the following

```bash
cd budgify
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you would like to fork this app, please see [following guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

## Contributions

Possible additions:
```
- Ability to select a specific date to filter transactions by
```

Pull requests and changes are welcome.


## License

This project is MIT licensed
