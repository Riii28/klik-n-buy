# 🛒 E-Commerce Platform with Next.js & Firebase

A modern fullstack e-commerce application built with **Next.js App Router**, **Firebase Firestore**, and **Firebase Authentication**. This app supports a full checkout flow with real-time database interaction and dynamic order management.

## 🚀 Features

-  🔐 **Authentication** (Google & Credentials - via NextAuth.js)
-  🛍️ **Product Catalog** (stored in Firestore)
-  📦 **Cart & Checkout** with `sessionStorage`
-  💳 **Multiple Payment Methods** (mocked UI)
-  📑 **Orders & Order Items** creation with Firestore batch writes
-  📈 **Inventory Management** (update `sold` count per product)
-  📁 Modular architecture using `hooks`, `context`, and `api routes`

---

## 🧠 Tech Stack

| Tech           | Description                               |
| -------------- | ----------------------------------------- |
| [Next.js 14]   | App Router architecture                   |
| [Tailwind CSS] | Modern utility-first styling              |
| [Firebase]     | Firestore + Firebase Admin SDK            |
| [NextAuth.js]  | Authentication handling (Google + Custom) |
| [Zod]          | Schema validation for forms & API payload |

---

## 🛠️ Setup & Installation

1. **Clone the repo**

```bash
git clone https://github.com/Riii28/klik-n-buy.git
cd klik-n-buy
```
