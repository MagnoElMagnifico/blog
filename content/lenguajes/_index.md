---
title: Lenguaje de programación
---

En esta subcategoría se encuentran mis apuntes sobre diferentes lenguajes de
programación, que listados encima de este párrafo.

# Mi tier list de lenguajes de programación
![](./langs-tier-list.jpg)

# Lenguajes populares
A continuación aparece una lista de las páginas más conocidas para mirar la
popularidad de algunos lenguajes de programación, tecnologías y demás historias
relacionadas con el desarrollo de software y ordenadores en general.

+ **TODO**: StackOverflow Survey 2021 & 2022

+ [Stackoverflow 2020](https://insights.stackoverflow.com/survey/2020)
    - Backend: Rust
    - Frontend: ¿React JS?
    - Desktop: Java(FX), Python(TKinder)
    - Mobile: Python(Kivy, BeeWare)
    - ML/DS: Python
    - Game: Godot, C/C++, Rust
    - Graphics: Java, C/C++, Rust

+ [Tiobe](https://www.tiobe.com/tiobe-index/)
    - C
    - Java
    - Python
    - C++
    - ...
    - JavaScript
    - ...
    - Rust

+ [Github PullRequests 2021](https://madnight.github.io/githut/#/pull_requests/2021/2)
    - JS
    - Python
    - Java

# Build systems
+ Java: Graddle
+ C/C++: CMake
+ Rust: cargo
+ Python: PyPl (pip)
+ C#: paso jaja
+ JavaScript: npm

# Otros
+ Python
    - [Requirements.txt](https://realpython.com/lessons/using-requirement-files/)
    - [Mobile](https://www.monterail.com/blog/python-for-mobile-apps-is-it-a-good-choice)

---------------------------------------------------------

<!-- TODO -->

Ownership & borrowing: https://betterprogramming.pub/rust-ownership-and-borrowing-9cf7f081ade0

GUI: https://medium.com/digitalfrontiers/gui-programming-with-rust-c71fe4051b1a

https://www.areweguiyet.com/
https://www.arewewebyet.org/

Game dev tut: https://sunjay.dev/learn-game-dev/getting-started.html


Common collections
heap: growables
vectors: all the elements will be deleted
let v = vec![1, 2, 3];
let v: Vec<type> = Vec::new();
push: add element at back
[index]: access elements (panics! if invalid)
get(index): same as before (returns Option (Some/None))
last two are references (si creamos referencia, y añadimos elementos, puede q no sigan en el mlsmo sitio, por lo q seria referencia invalida, errror de compilacion)
for elem in &v //loop through the content (read)
for elem in &mut v //same (but also write: dereference firts with *)

strings: collection of utf8 encoded bytes (1-4 bytes, encoded following Unicode / compatible with ascii)
String::new(); new string
"".to_string()
String::from("")
"" new string slice/literal
push add new char
push_str push new string slice
concatenate w + (using references) or format! (as println)
strings can be represented as bytes (vec u8) scalar (char, combination of several, acentos?) grapheme clusters (what we call char)
bytes returns the string as bytes
chars returns the string as chars
unicode-segmentation (crate) to graphemes: graphemes(is_extended)

hash map
stores values + key using a hash func
use collections::HashMap;
HashMap::new()
insert(key, value) toma ownership, podemos pasar referencia pero necesita de lifetimes (override)
entry(key).or_insert(value) just add if empty + mas cosas docs
get(key) returns option some(value)/none
for (key, value) in &/*mut*/ hash_map

generics
use several data types
fn foo<T>(a: T, b: T)
fn foo<T, U>(a: T, b: U)
podemos especificar q tipo de dato es y no cualquiera con traits
fn foo<T: PartialOrd + Copy>(a: T) a se puede comparar y copiar
tambien aplicable a structs y enums
impl<T> foo<T> { ... } no depende de la definicion en el struct incluso podemos crear impl foo<char>
todo esto no afecta a performance

traits
trait name {
   fn foo(); //can add default body (this overrides the default one)
 }
 imp name for struct {
 fn foo(){
 //algo
 }}
trait as param fn foo(a: &(impl name + other)) -> impl name
trait bounds: fn foo<T: name+other>(a: T, b: T) t es un tipo q implementa name y other, igual q b (de la otra forma no seria posible
alternativo fn foo<T, U> (a: T, b: U) -> char where T: name, U: name + other { ... }

lifetimes
https://blog.logrocket.com/understanding-lifetimes-in-rust/
https://blog.thoughtram.io/lifetimes-in-rust/
http://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/lifetimes.html
very reference in Rust has a lifetime, which is the scope for which that reference is valid. but most of the time are implicit by the compiler
las referencias deben de ser siempre validas, por lo q si tenemos una referencia a un valor borrado tendremos error
let mut ref;
{ let value = 10; ref = &value; }
//ref is not valid here (dangeling reference)
esto se comprueba con el borrow checker

let s1 = String::from("a");
let s2 = String::from("abcdef");

let result = longest(s1.as_str(), s2.as_str());
println!(result);

// &i32 reference
// &'a i32 reference w lifetime
// &'a mut i32 mut ref w lifetime
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str{ //without the generic, error
if a.len() > b.len() {
    a
} else {
    b
}
}

struct Name<'a>{
someting: &'a str;
}

automaticly
each parameter that is a reference gets its own lifetime parameter
if there is exactly one input lifetime parameter, that filetime is assigned to all output lifetime parameters
if there are multiple input lifetime parameters, but one of them is &self or &mut self the lifetime of self is assigned to all output lifetime parameters

'static lifetime for all the program (as string literals)

closures
funciones sin nombre q puede guardarse, usarse como si fuesen datos, pasarlas como params
let closure = |params| { ... } //if one line, can remove
not necesary to determine the types (tomara el primer valor se le pase)
closures tienen acceso a variables de una scope superior (entorno)

FnOnce takes ownership of variables from its enviroment (once because only can call once, data deleted) move || {}
FnMut mutably  borrow value
Fn inmutamily borrow value

struct<T> ??
where T: Fn(i32) -> i32 //FnMut/FnOnce
closure: T,
result: Option<i32>
}

impl<T> ??<T>
where T: Fn(i32) -> i32 {
fn new(init_closure: T) {
?? {
closure: init_closure,
result: None
}
}
fn result(&mut self, arg: i32) -> i32 {
if self.result == None {
self.result = Some(self.closure(arg)); or Some((self.closure)(arg)
}
self.result
}
}

iterators
let iterate through a sequence of elements, no matter how it is stored (array, hash map,...)

pub trait Iterator { //other methods have default implementations: two types iterators (take iter, return iter) and consumers (take iter, return element)
type Item;
fn next(&mut self) -> Option<Self::Item>;
}

let v = vec![1, 2, 3];
for value in v.iter() { //returns inmut references / use iter_mut for mut references / onto_iter() for own types
print(value)
}

iterators adaptors
map(closure) calls clorure for each element (returns iterator)
filter(closure) returns element if closure returns true
map(|x| x + 1).collects()

create own iterators
struct Counter { value: u32 }
impl Counter {
fn new() -> Counter {
Counter { value : 0 }
}
}
impl Iterator for Counter {
type Item = u32;
fn next(&mut self) -> Option<Self::Item> {
if self.value < 5 { self.value += 1; Some(self.value)}
else {None}
}
}

cargo build --release
cargo doc --open
cargo login aaa bbb token from crates.io
cargo publish (must be commited + default values + description + license) : cannot delete, but forbid specific version w cargo yank --vers <version> [--undo]

/// `markdown here`
/// ```
/// code as test
/// ```
sections: examples / panic / error / unsafe
examples are actual tests
//! this is for files

pub use direction; avoid the user of the lib to write the whole path

Cargo.toml (default)
[profile.dev]
opt-level = 0 # min

[profile.release]
opt-level = 3 # max

workspaces
[workspace]
members = [ "adder", "add_one" ]
# inside that path must be a valid paxkage

inside add_one depends on adder
add_one cargo.toml
[dependencies]
adder = { path = "../adder" }

cargo run -p <package>
cargo test -p <package>
you have to pusblish them individualy

cargo install instala en user/.cargo/bin un ejecutable, no sirven libs
con esto podemos hacer "plugins" para cargo, si se llama cargo-something ejecutariamos cargo something

smart pointer
variable stores memory address, so is a variable that holds another variable (+ data). The most common is the reference
smart pointers keep track of the pointers to a specific data, when there is no more pointers, it is deleted. unlike referenced, smart pointers own the data in some way. vectors and strings are smart pointers: have metadata, own the data
these are struct implementing deref drop traits
box is a smart pointer that allocates memory on the heap
let b: Box<i32> = Box::new(5);

enum List<T> {
Cons(T, List<T>), // rust necesita saber cuanto espacio ocupa list, debemos hacer Box<List<T>>
Nul
}
let li = Cons(1, Cons(2, Cons(3, Nul)));
let li = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nul))))))

cargo check //show error wout compile

deref trait
customiza el deref operator (*)

struct MyBox<T> (T); // hold one value
impl<T> MyBlock<T> {
fn new(x: T) -> MyBox<T> { MyBox( x ) } // esto no esta en la heap, pero sirve para el ejemplo
}

use std::ops::Deref;
impl<T> Deref for MyBox<T> {
type Target = T;
fn deref(&self) -> &Self::Target { &self.0 }
// devuelve una referencia, porq lo q hace el compilador es lo siguiente: *(x.deref()) llama al metodo para obtener la referencia y luego la desreferencia. esto pasa automaticamente
}

DerefMut for deref mut references

deref coercion
en algunos casos la desreferencia se llama automaticamente

from &T to &U when T: Deref<Target=U>
from &mut T to &mut U when T: DerefMut<Target=U>
from &mut T to &U when T: Deref<Target=U>

Drop trait -> especifica como se debe borrar un elemento cuando sale de scope (se llama automaticamente, no deja llamar al metodo manualmente, pero se puede hacer drop(???))
impl Drop for ??? {
fn drop(&mut self){
//
}
}
