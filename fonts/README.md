# Fonts

This portfolio intentionally uses **local system font stacks** so it works offline with no external requests and no missing-file errors.

- Display (headings): `"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif`
- Body: `"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif`

The design looks consistent on Windows, macOS, and Linux thanks to the Georgia / Palatino and Segoe UI / Helvetica fallbacks.

## Using your own fonts

1. Put your `.woff2` (and optional `.woff`) files in this `fonts/` folder.
2. Add declarations at the top of `../css/style.css`, for example:

```css
@font-face {
  font-family: "Your Display Font";
  src: url("../fonts/your-display-font.woff2") format("woff2");
  font-display: swap;
}
```

3. Update `--font-display` and/or `--font-body` in the `:root` block of `../css/style.css` to use your new family name.

Only reference font files that actually exist in this folder — otherwise the browser will log a missing-file error.
