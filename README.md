
# ⚡ Zeus Insurance

**Decentralized insurance protocol for AI agents.**

Zeus Insurance allows buyers of APIs and digital services to protect their payments against seller failures. If the seller fails to deliver within the agreed time, the buyer receives compensation from the protocol's reserve fund.

The protocol runs on **Base Sepolia** and uses **USDC** for settlements.

---

## 🎯 Problem & Solution

**Problem:** AI agents increasingly pay for API access, data, and compute. But sellers may fail to deliver — money is deducted, results are not received. Manual refunds are complex, and trust in the M2M economy is low.

**Solution:** Zeus Insurance is a smart contract that allows a buyer to insure a transaction for a small percentage (premium). If the seller does not respond within the specified time, the buyer receives compensation.

---

## 📦 Repository Contents

- **`contracts/`** — `ZeusInsurance.sol` smart contract (Solidity, OpenZeppelin)
- **`frontend/`** — React interface for interacting with the contract (ethers.js, Tailwind)
- **`scripts/`** — deployment and testing scripts
- **`test/`** — unit tests for the contract (Hardhat)

---

## 🛠 Tech Stack

| Component        | Technologies |
|------------------|--------------|
| Smart Contract   | Solidity 0.8.24, OpenZeppelin (ReentrancyGuard, Ownable) |
| Testnet          | Base Sepolia (Ethereum L2) |
| Token            | USDC (address: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`) |
| Frontend         | React, ethers.js, Tailwind CSS |
| Development      | Hardhat, TypeScript, pnpm |
| Hosting          | Replit (frontend), Netlify (optional) |

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/igor-vii/zeus-insurance.git
cd zeus-insurance
2. Install dependencies
bash
cd contracts
npm install
3. Set up environment variables
Create a .env file in the contracts folder:

env
PRIVATE_KEY=0xyour_private_key
4. Compile the contract
bash
npx hardhat compile
5. Run tests
bash
npx hardhat test
6. Deploy to Base Sepolia
bash
npx hardhat run scripts/deploy.js --network baseSepolia
🖥 Frontend
The interface is available at (if deployed):
👉 zeus-insurance--zeusinsurance.replit.app

Pages:

/ — dashboard: reserve, policy count, wallet status

/buy — buy insurance (select seller, amount, timeout, retries)

/policies — your policies with claim payout functionality

/admin — deposit / withdraw reserve (owner only)

🔗 Contract on BaseScan
Contract address on Base Sepolia:

text
0xbe8B48f3ad126a8546BA895Cd42B72AA715C382B
🔗 View on BaseScan

📊 Economics
Premium = 7% to 25% of transaction amount (depends on retries count)

Payout = 100% of transaction amount (if seller fails to deliver)

Reserve fund — funded by premiums, managed via multisig

🧪 Testing
bash
cd contracts
npx hardhat test
All tests pass successfully (43 tests).

📌 License
MIT © 2026 Zeus Insurance Team

🤝 Contacts
GitHub: igor-vii/zeus-insurance

Telegram: (add your contact)

Website: (frontend link or landing page)

⭐ If you find this project interesting — star it on GitHub!
# ⚡ Zeus Insurance

**Децентрализованный страховой протокол для AI-агентов.**

Zeus Insurance позволяет покупателям API и цифровых услуг защитить свои платежи от сбоев продавцов. Если продавец не выполнил работу в срок — покупатель получает компенсацию из резервного фонда протокола.

Протокол работает на **Base Sepolia** и использует **USDC** для расчётов.

---

## 🎯 Проблема и решение

**Проблема:** AI-агенты всё чаще платят за доступ к API, данным и вычислениям. Но продавцы могут не выполнить работу — деньги списаны, результат не получен. Ручные возвраты сложны, а доверия в M2M-экономике нет.

**Решение:** Zeus Insurance — это смарт-контракт, который позволяет покупателю застраховать сделку за небольшой процент (премию). Если продавец не отвечает в течение заданного времени, покупатель получает компенсацию.

---

## 📦 Что входит в репозиторий

- **`contracts/`** — смарт-контракт `ZeusInsurance.sol` (Solidity, OpenZeppelin)
- **`frontend/`** — React-интерфейс для взаимодействия с контрактом (ethers.js, Tailwind)
- **`scripts/`** — скрипты для деплоя и тестирования
- **`test/`** — юнит-тесты для контракта (Hardhat)

---

## 🛠 Технологический стек

| Компонент | Технологии |
|-----------|------------|
| Смарт-контракт | Solidity 0.8.24, OpenZeppelin (ReentrancyGuard, Ownable) |
| Тестовая сеть | Base Sepolia (L2 на Ethereum) |
| Токен | USDC (адрес: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`) |
| Фронтенд | React, ethers.js, Tailwind CSS |
| Разработка | Hardhat, TypeScript, pnpm |
| Хостинг | Replit (фронтенд), Netlify (возможен) |

---

## 🚀 Установка и запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/igor-vii/zeus-insurance.git
cd zeus-insurance
2. Установите зависимости
bash
cd contracts
npm install
3. Настройте переменные окружения
Создайте файл .env в папке contracts:

env
PRIVATE_KEY=0xваш_приватный_ключ
4. Скомпилируйте контракт
bash
npx hardhat compile
5. Запустите тесты
bash
npx hardhat test
6. Разверните на Base Sepolia
bash
npx hardhat run scripts/deploy.js --network baseSepolia
🖥 Фронтенд
Интерфейс доступен по ссылке (если развёрнут):
👉 zeus-insurance--zeusinsurance.replit.app

Страницы:

/ — дашборд: резерв, количество полисов, статус кошелька

/buy — покупка страховки (выбор продавца, суммы, таймаута, количества попыток)

/policies — список ваших полисов с возможностью подать заявку на выплату

/admin — пополнение и вывод резерва (только владелец контракта)

🔗 Контракт на BaseScan
Адрес контракта на Base Sepolia:

text
0xbe8B48f3ad126a8546BA895Cd42B72AA715C382B
🔗 Открыть на BaseScan

📊 Экономика
Премия = от 7% до 25% от суммы сделки (зависит от количества попыток)

Выплата = 100% суммы сделки (если продавец не выполнил работу)

Резервный фонд — пополняется из премий, управляется через мультисиг

🧪 Тестирование
bash
cd contracts
npx hardhat test
Все тесты проходят успешно (43 теста).

📌 Лицензия
MIT © 2026 Zeus Insurance Team

🤝 Контакты
GitHub: igor-vii/zeus-insurance

Telegram: (добавьте ваш контакт)

Сайт: (ссылка на фронтенд или лендинг)

⭐ Если вам интересен проект — поставьте звезду на GitHub!
