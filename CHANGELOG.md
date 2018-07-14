# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

*Internal changes are italicized.*

## [2.0.0] - 2018-07-14
### Added
- New `init` command
- New `checkout` option `-b` similar to `git checkout -b`.

### Changed
- Configuration file `.tugrc` is now `.tugrc.json` and lives in your project root.
- Fewer instances where the `--force` flag is required, we'll automatically figure it out usually now.
- *Switched to ESLint w/ AirBnB styles*
- *Reworked most of the `util/` module, including extracting common functions to `actions/`*

### Removed
- The `create` command; use `checkout -b` instead.
- We don't support custom `dir` command with each `tug` call anymore; set your storage location on `init`. You can call `tug init -f` to force reinitialization.

