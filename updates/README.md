# Update patches

The desktop updater reads `update-manifest.json` from the `develop` branch of
`ArkansasIo/game-enigne-paper-make-redsigen-`.

To publish an update, increase `latestVersion`, add release-note strings, and
append a patch entry. Each file is fetched from the same repository and written
relative to the packaged application root.

```json
{
  "version": "3.2.7",
  "files": [
    {
      "source": "updates/patches/3.2.7/dist/assets/editor.js",
      "destination": "dist/assets/editor.js"
    }
  ]
}
```

Only include changed files. The updater applies patches newer than the installed
version, then updates `dist/version` after every file has downloaded.
