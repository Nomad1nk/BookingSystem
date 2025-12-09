# Booking System / 予約システム

A premium booking system built with modern web technologies, featuring multi-language support and a sleek, animated user interface.
最新のWeb技術を使用して構築された、多言語対応と洗練されたアニメーションUIを備えたプレミアム予約システム。

## 🛠 Tech Stack / 技術スタック

### Frontend / フロントエンド
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Features:**
  - Multi-language Support (i18n: MN, EN, JP) / 多言語対応
  - Animated Backgrounds & UI Components / アニメーション背景とUIコンポーネント
  - Responsive Design / レスポンシブデザイン

### Backend / バックエンド
- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL
- **Features:**
  - RESTful API
  - Stripe Payment Integration / Stripe決済統合
  - Service & Booking Management / サービスと予約管理

## 🚀 Getting Started / 始め方

### Prerequisites / 前提条件
- Node.js
- PostgreSQL
- Stripe Account (for payments)

### Installation / インストール

1. **Clone the repository / リポジトリをクローン**
   ```bash
   git clone https://github.com/Nomad1nk/BookingSystem.git
   cd BookingSystem
   ```

2. **Setup Backend / バックエンドの設定**
   ```bash
   cd backend
   npm install
   # Configure .env file with DATABASE_URL and STRIPE_SECRET_KEY
   npx prisma migrate dev
   npm run start:dev
   ```

3. **Setup Frontend / フロントエンドの設定**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the App / アプリにアクセス**
   Open [http://localhost:3000](http://localhost:3000) in your browser.
