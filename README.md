# ✉️ Mail

> Email composer with rich formatting

Part of the [zOS Apps](https://github.com/zos-apps) ecosystem.

## Installation

```bash
npm install github:zos-apps/mail
```

## Usage

```tsx
import App from '@zos-apps/mail';

function MyApp() {
  return <App />;
}
```

## Package Spec

App metadata is defined in `package.json` under the `zos` field:

```json
{
  "zos": {
    "id": "ai.hanzo.mail",
    "name": "Mail",
    "icon": "✉️",
    "category": "productivity",
    "permissions": ["network"],
    "installable": true
  }
}
```

## Version

v4.2.0

## License

MIT © Hanzo AI
