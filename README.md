# Step Finance Staking dApp

This repo is a result of completing a programming assignment for Step.finance by [@calija](https://github.com/calija).
It features a staking page for Step/xStep, trying to mimic basic features from the actual Step Finance v2 page.

For convenience, the app is also hosted on Vercel at [StepStakingDapp](https://my-solana-dapp.vercel.app) 
(please be aware that the dApp will not be recognized by your wallet).

## Technologies Used

1. **Next.js:** A React framework with server-side rendering and static site generation.
2. **TypeScript:** Used to ensure type safety and a better developer experience.
3. **TanStack Query:** A data-fetching and caching library used for managing server state and API calls.
4. **Tailwind CSS:** A utility-first CSS framework used for styling the app.
5. **Lucide React:** A React library for implementing icons throughout the project.
6. **ShadCN UI:** A collection of UI components built on top of Tailwind CSS, used to create consistent design.
7. **Sonner:** A lightweight toast notification library used for displaying in-app notifications.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```bash
   git clone https://github.com/calija/stepStakingDapp.git
```

2. Navigate to the project directory:

```bash
   cd stepStakingDapp
```

3. Install dependencies:

```bash
   npm install
```

4. Create a .env file by copying .env.example:

```bash
   cp .env.example .env
```

5. Open the newly created `.env` file and update the `NEXT_RPC_URL` field as follows:

```bash
   NEXT_RPC_URL=https://mainnet.helius-rpc.com/?api-key=<YOUR-API-KEY>
```

Replace <YOUR-API-KEY> with the actual API key provided by [Helius RPC](https://www.helius.dev/). It is required to create an account and obtain a key from Helius, as the app specifically uses their RPC service

6. Run the development server:

```bash
   npm run dev
```


7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

