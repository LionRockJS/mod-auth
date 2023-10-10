# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.3.0](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v3.2.0...v3.3.0) (2023-05-31)


### Features

* support multiple identifiers after login ([c89cd62](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/c89cd62a4469e21c231a45b918d42ed6ce220b64))

## [3.2.0](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v3.1.0...v3.2.0) (2023-05-29)


### Features

* registerFilter and loginFilter pass state as argument ([d46f946](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/d46f946ecf5beefc84a86a7919efc7fcb1c5e6e3))

## [3.1.0](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v3.0.4...v3.1.0) (2022-09-16)


### Features

* /account dashboard receive identifiers instances ([1edc79f](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/1edc79f1780de63240accc0489c2ffef1668b558))
* controller account roles set to wildcard ([b86446c](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/b86446c782bdfeeeb8cc20b9ca6f717490476d1c))
* login required allow roles wildcard ([2c69b5b](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/2c69b5b332fe8059233a7265d9de47d81e217118))


### Bug Fixes

* ControllerAccount,  ControllerRegister error ([4ec0cc8](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/4ec0cc869e0277925fd9f6601a95ef7b7909ad87))

### [3.0.4](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v3.0.3...v3.0.4) (2022-09-07)

### [3.0.3](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v3.0.2...v3.0.3) (2022-06-22)

### [3.0.2](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v3.0.1...v3.0.2) (2022-04-12)


### Bug Fixes

* CI test ([7488f8f](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/7488f8f9c9e6f032c061722814939ef217dd44d9))
* tests ([626fd5d](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/626fd5d842864e384a285813e36fda1fc0a7c498))

### [3.0.1](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v3.0.0...v3.0.1) (2022-03-09)

## [3.0.0](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v2.0.3...v3.0.0) (2022-03-09)


### ⚠ BREAKING CHANGES

* add require sequence in index.js and routes.js

* add require sequence in index.js and routes.js ([fc79641](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/fc796412ad9db22ab63fcfa9943eec9bd357a972))

### [2.0.3](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v2.0.2...v2.0.3) (2021-12-20)

### [2.0.2](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v2.0.1...v2.0.2) (2021-10-29)


### Bug Fixes

* session user full name not change after save person info ([93ed1be](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/93ed1bed4447040ff7dfd312ab8db4ec710ea2a9))

### [2.0.1](https://gitlab.com/kohanajs-modules/stage0/mod-auth/compare/v2.0.0...v2.0.1) (2021-10-29)

## 2.0.0 (2021-10-29)


### ⚠ BREAKING CHANGES

* PasswordIdentifier rename to IdentifierPassword

### Features

* add ControllerMixinAccount and ControllerMixinPassword ([fdd1873](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/fdd1873d4ed6a518948c96aa61d90f5ea80bc90b))
* add ControllerMixinPlaceholders ([eed1de8](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/eed1de8f78ddc9c0361507c0104daa42be52970f))


* PasswordIdentifier rename to IdentifierPassword ([0a780a6](https://gitlab.com/kohanajs-modules/stage0/mod-auth/commit/0a780a62fb5dbae302dcb419317017e95e8c7a4d))

## [1.2.0] - 2021-10-18
### Added
- add session user_meta

## [1.1.3] - 2021-10-06
### Fixed
- logout have error without $_POST.password

## [1.1.2] - 2021-10-06
### Fixed
- redirect after register

## [1.1.1] - 2021-10-06
### Fixed
- register with roles no need to split

## [1.1.0] - 2021-10-06
### Changed
- Split auth and register into 2 controller and controller mixin