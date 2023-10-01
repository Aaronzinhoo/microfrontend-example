# Angular Microfrontend (MFE) Example

## Quick Start

This command should start both micro front-end apps (the shell and MFE 1) and load them up in the browser.

```shell
# in project root folder
npm i
npm run run:all
```

## Adding a new remote app to the shell

- ensure remote app exposes standalone component or module via its `webpack.config.js`
- in the `shell` app, add remote app name to `remotes` field in `./projects/shell/webpack.config.js`
- add the remote apps import path to `./projects/shell/src/decl.d.ts`
- load component or module using `loadComponent` or `loadChildren` respectively

## Project Breakdown

### Shell

This is the app that connects all the microfrontends and loads them as needed. The configuration to be a shell is handled by `angular-architects/module-federation` library but the overall setup is minimal. The main changes can be viewed within the `app.routes.ts` and `webpack.config.js` files under the `projects/shell` folder.

### Mfe1

This app is used to represent a standalone deployed angular app separate from the shell. It is configured as an `angular-architects/module-federation` `remote` app that creates a `remoteEntry.js` file when it is built. This file contains scripts as well as the exposed modules/components to be used within the `shell`. `Shell` apps will request this file when connecting to a remote app. When/how the request is made is configurable within the `shell` app.

## MFE Overview

Microfrontends can be described as the composition of frontend applications that still provides a seamless unified user experience. This example repo provides one way that composition can be orchestrated and is just one pillar to making a great MFE application. When discussing MFE's there are 3 pillars that must be distinguished, understood, and accounted for to ensure the flexible, scale-able, and seamless integration of multiple applications.

- Governance
- Composition
- Communication

### Governance

Governance describes how teams split up the microfrontends ownership and creation. MFE's can be divided and displayed in a couple ways. A single app within MFE could be responsible for the display of an entire page or a page can be broken into multiple MFE apps or both. Ensuring this is discussed and responsibilities are delineated in a clear manner are important. Ownership can be done in a way to that aligns with domain boundaries as well. For instance if we are building an online shopping app, one MFE app could responsible for User page (or components) whereas another could be responsible for Orders. Assuming our boundaries and application logic is not leaky, each team should be able to focus on their portion of the application without much concern of the other teams until there is a need to integrate! That is where composition and communication play a key role, but the necessity to discuss about them stem from our governance policies.

### Composition

Governance provides the "What" or baseline definition that drives our MFE architecture. Composition describes a portion of the "How" by describing how MFE apps can be strung together. You can take 3 routes, server-side orchestration, edge orchestration, or client-side orchestration. In this example repo we are performing client-side composition. The clients browser requests for ``remoteEntry.js` of our remote apps and displays the necessary portions dynamically by rendering the content in the browser. Another example of client-side composition is by utilizing iFrames. Client-side composition provides us with runtime composition capabilities as well (ex: urls can be dynamically provided at runtime!). Server-side orchestration entails build time composition and can be done by utilizing a framework like `Piral`. At runtme on the server side the apps are bundled and served as a whole to the client. Another example of build time composition is injecting an application via a library into another app. Edge orchestration can also be implemented by using various libraries but is outside the scope of this discussion to investigate further.

### Communication

Interfaces that provide means of communication between application are essential to a decoupled and scale-able architecture. State stores such as NgRx help facilitate state sharing and communication in an MFE architecture, but force teams to utilize an opinionated dependency that is not might not be framework agnostic. Browser API offers many different solutions that can help alleviate dependency on complex or framework dependent solutions. Several are listed below

- Broadcast Channel API
- Custom Event API
- Route Parameters
- Web Storage API

Broadcast channels and custom events provide a great way to implement an observer pattern where many listeners can subscribe to a channel to get updates to resources within a certain domain. In the case of sharing access to state (lets assume one writer and many readers), the Web Storage API provides a simple interface to get and set values but precautions must be taken to restrict write access to the owner of the data.
