# Deployment Prep Guide

## 1. Required environment variables

Create a real `.env.production` or GitHub Actions secret values using the following keys:

```env
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
```

## 2. Admin login

Open the site at:

```text
https://your-domain.com/admin
```

Use the admin username and password that you set in the environment variables above.

## 3. Content that can be updated from the admin panel

- hero banner background image
- announcement banner title, message, CTA text, CTA link
- programs
- gallery images

## 4. Important deployment safety note

Do not commit the real `.env` file or production secret values to GitHub. Only commit `.env.example` and add secrets directly in your deployment platform.
