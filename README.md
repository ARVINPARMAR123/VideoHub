# 🎬 ClipVault

**ClipVault** is a modern cloud-based video management platform that allows users to upload, store, preview, compress, download, and manage their videos from a single responsive interface.

The project uses **Cloudinary** for cloud-based video storage and media management and **Clerk** for secure user authentication.

## ✨ Features

* 🔐 User authentication with Clerk
* 📤 Upload videos to Cloudinary
* ☁️ Cloud-based video storage
* 🎥 Video preview and playback
* 🗜️ Video compression support
* 📥 Download uploaded videos
* 🗑️ Delete videos
* 📊 Video library with upload information
* 🔗 Social video sharing
* 📱 Responsive user interface
* 🎨 Modern dashboard design
* ⚡ Fast and interactive Next.js application

## 🛠️ Technologies Used

* **Next.js** – React framework for the application
* **React** – User interface development
* **TypeScript** – Type-safe development
* **Tailwind CSS** – Styling and responsive design
* **DaisyUI** – UI components
* **Clerk** – User authentication
* **Cloudinary** – Video storage and media management
* **Lucide React** – Icons

## 📂 Main Sections

### 🏠 Home Page

### 📤 Video Upload

### 🎥 Video Library

### 🔗 Social Share

## 🔐 Authentication

ClipVault uses **Clerk** to provide authentication and user management.

Users can securely:

* Sign in
* Sign out
* Access their personal video library
* Manage their uploaded videos

## ☁️ Cloudinary Integration

Cloudinary is used as the application's cloud media storage solution.

The application uses Cloudinary for:

* Video uploads
* Video storage
* Video delivery
* Video transformations
* Video compression
* Media management

## 📱 Responsive Design

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/clipvault.git
```

### 2. Navigate to the Project

```bash
cd clipvault
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 📁 Project Structure

```text
clipvault/
├── app/
│   ├── home/
│   ├── social-share/
│   ├── video-upload/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── ...
│
├── lib/
│   └── ...
│
├── public/
│   └── ...
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

## 👨‍💻 Author

**Arvin Parmar**

This project was developed as a full-stack web application to explore cloud media management, authentication, video processing, and modern web application development.
