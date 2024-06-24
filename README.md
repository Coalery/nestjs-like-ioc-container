# nestjs-like-ioc-container

Nestjs-like IoC Container

## Motivation

Nestjs가 실제로 의존성을 주입해주는 방법을 알아보고, [이에 대한 글](https://velog.io/@coalery/nest-injection-how)을 작성했었습니다. 그 이후로 직접 Nestjs-like한 IoC Container를 직접 구현해보고 싶다는 생각을 계속 했었는데, 이를 행동에 옮긴 결과입니다.

Nestjs와는 달리 백엔드 어플리케이션 용이 아니라, 단순히 IoC Container만 구현하는 것이 본 레포지토리의 목표입니다. 따라서, 모듈에서 `controllers` 파라미터를 받지 않고, 컨트롤러 같은 데코레이터도 존재하지 않습니다.

또, 구현하는 과정에서 공부하는 것이 주 목적이며, 실제 사용을 염두에 둔 코드가 아닙니다. 참고 부탁드립니다.

## Prerequisites

- Node.js v20.15.0

## Installation

```shell
git clone https://github.com/Coalery/nestjs-like-ioc-container.git
npm install
```

## Run

```shell
npm run start
```

## Test

```shell
npm run test
```
