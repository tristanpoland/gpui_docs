---
title: About GPUI
image:
tags: []
stability: stable
excerpt: A brief introduction to GPUI
---

# Building Your First GPUI Application

Welcome to GPUI! Let's build a simple window application step by step.

## The Basics

GPUI is a GPU-accelerated UI framework written in Rust. It uses a component-based architecture similar to React, but with native performance.

Here's our starter code:

```rust
use gpui::{
    div, prelude::*, px, rgb, size, App, Application, 
    Bounds, Context, Window, WindowBounds, WindowOptions,
};

fn main() {
    Application::new().run(|cx: &mut App| {
        // Window configuration goes here
    });
}
```

## Components in GPUI

Components in GPUI are structs that implement the `Render` trait. Here's a basic component:

```rust
struct HelloWorld {
    message: SharedString,
}

impl Render for HelloWorld {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .flex()
            .size_full()
            .bg(rgb(0x000000))
            .child(
                div()
                    .text_color(rgb(0xFFFFFF))
                    .child(self.message.clone())
            )
    }
}
```

Key points:
- `SharedString` is GPUI's string type for UI elements
- `div()` creates a new div element
- Styling uses method chaining (`.flex()`, `.size_full()`)
- Colors use the `rgb()` function with hex values

## Creating a Window

To display your component, create a window:

```rust
fn main() {
    Application::new().run(|cx: &mut App| {
        let bounds = Bounds::centered(None, size(px(800.0), px(600.0)), cx);
        
        cx.open_window(
            WindowOptions {
                window_bounds: Some(WindowBounds::Windowed(bounds)),
                ..Default::default()
            },
            |_, cx| {
                cx.new(|_| HelloWorld {
                    message: "Hello, GPUI!".into(),
                })
            },
        ).unwrap();
    });
}
```

The window configuration:
- `Bounds::centered` creates a centered window
- `size(px(800.0), px(600.0))` sets window size to 800x600 pixels
- `WindowOptions` configures window properties
- `cx.new()` creates your component instance

## Styling Elements

GPUI uses a fluent API for styling:

```rust
div()
    .flex()                    // display: flex
    .flex_col()               // flex-direction: column
    .items_center()           // align-items: center
    .justify_between()        // justify-content: space-between
    .px_4()                   // padding-left/right: 4 units
    .bg(rgb(0x000000))       // background-color: black
    .text_color(rgb(0xFFFFFF)) // color: white
    .child("Hello!")          // Add child content
```

## Next Steps

Try these exercises:
1. Add a button to your component
2. Change the background color on hover
3. Add multiple child elements in a flex layout
4. Implement a click handler

Remember:
- GPUI uses Rust's ownership system
- All UI updates happen through state changes
- Components re-render automatically when state changes
- Use `cx` for context-dependent operations

Documentation is your friend - check out the GPUI docs for more detailed APIs and examples.