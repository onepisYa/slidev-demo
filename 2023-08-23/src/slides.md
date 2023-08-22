---
layout: cover
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
growSize: 1.5
routerMode: hash
# enable monaco editor, can be boolean, 'dev' or 'build'
monaco: 'build'
---


# Learn Slidev

<div mt--2>
<h1 flex="~ col">
<div>Read Doc and Write Notes</div>
<div flex="~ gap3" items-center><div i-simple-icons-github />Do Practice</div>
</h1>

<div uppercase tracking-widest op50>
onepisYa
</div>
</div>

<div abs-bl mx-13 my-12 flex="~ col" text-sm text-left>
  <div text-sm opacity-50>Aug 23th, 2023</div>
</div>



---
layout: intro
growX: 70
growY: 40
style: 'padding-left: 8rem;'
---


# [Why Slidev?](https://sli.dev/guide/why.html#slidev)





<p class="bold font-2xl pt-5">Here are a few of the coolest features of Slidev:</p>
 
 
<div class="space-y-5">
  
- Markdown-based
- Themeable
- Developer Friendly
- Fast
- Interactive & Expressive
- Recording Support
- Portable
- Hackable

</div>


---
layout: fact
growX: 50
growY: 0
growSize: 1.5
---

# Markdown Features

<div class="number-bg">0</div>


---
layout: fact
growX: 50
growY: 0
growSize: 1.5
---

# Markdown


You can use [the Markdown features](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) as you normally would, with the additional support of inlined HTML and Vue Components. 

Styling using [UnoCSS](https://sli.dev/custom/config-unocss) is also supported. Use `---` padded with a new line to separate your slides.


---
layout: center
growX: 50
growY: 0
growSize: 1.5
---

<div class="text-bg">Example</div>



```md
# Slidev

Hello, World!

---

# Page 2

Directly use code blocks for highlighting

//```ts
console.log('Hello, World!')
//```

---

# Page 3

You can directly use Windi CSS and Vue components to style and enrich your slides.

<div class="p-3">
  <Tweet id="20" />
</div>

```


---
layout: fact
growX: 50
growY: 0
growSize: 1.5
---

# Front Matter & Layouts

Specify layouts and other metadata for each slide by converting the separators into [front matter blocks](https://jekyllrb.com/docs/front-matter/). 

Each frontmatter starts with a triple-dash and ends with another. 

Texts between them are data objects in [YAML](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started/) format.


---
layout: center
growX: 50
growY: 0
growSize: 1.5
---

<div class="text-bg">Example</div>




```md
---
layout: cover
---

# Slidev

This is the cover page.

---
layout: center
background: './images/background-1.png'
class: 'text-white'
---

# Page 2

This is a page with the layout `center` and a background image.

---

# Page 3

This is a default page without any additional metadata.

```

Refer to [customization](https://sli.dev/custom/) for more details.


---
layout: fact
growX: 50
growY: 0
growSize: 1.5
---

# Code Blocks

One big reason I am building Slidev is needing to make my code look just right in the slides. 

So just as you expected, you can use Markdown flavored code block to highlight your code.


---
layout: default
growX: 50
growY: 0
growSize: 1.5
---

<div class="text-bg">Example</div>

<div class="mt-22"></div>


# 🌟

We support [Prism](https://prismjs.com/) and [Shiki](https://github.com/shikijs/shiki) as syntax highlighters. Refer to [the highlighters section](https://sli.dev/custom/highlighters.html) for more details.

````md
  ```ts
  console.log('Hello, World!')
  ```
````


---
layout: fact
growX: 50
growY: 0
growSize: 1.5
---

# [Line Highlighting](https://sli.dev/guide/syntax.html#line-highlighting)


---
layout: center
growX: 50
growY: 0
growSize: 1.5
---

<div class="text-bg">Example</div>
<p class="pt-5">
To highlight specific lines, simply add line numbers within bracket `{}`. 

Line numbers start counting from 1 by default.
</p>




````md
  ```ts {2,3}
  function add(
    a: Ref<number> | number,
    b: Ref<number> | number
  ) {
    return computed(() => unref(a) + unref(b))
  }
  ```
````

Effect

```ts {2,3}
  function add(
    a: Ref<number> | number,
    b: Ref<number> | number
  ) {
    return computed(() => unref(a) + unref(b))
  }
```


---
layout: center
growX: 50
growY: 0
growSize: 1.5
---

<div class="text-bg">Example</div>
  
You can enable line number to all slides by setting `lineNumbers: true` on the config or enable each code block individually by setting `lines:true`. 
  


In case you want to disable the numbering for an specific block when `lineNumbers: true` you can set `lines:false` for that block:

````md
  ```ts {2,3} { lines:false}
  function add(
    a: Ref<number> | number,
    b: Ref<number> | number
  ) {
    return computed(() => unref(a) + unref(b))
  }
  ```
````

---
layout: center
growX: 50
growY: 0
growSize: 1.5
---

<div class="text-bg">Effect</div>

# Effect

## lines:true

```ts {2,3} {lines:true }
  function add(
    a: Ref<number> | number,
    b: Ref<number> | number
  ) {
    return computed(() => unref(a) + unref(b))
  }
```

## lines:false

```ts {2,3} {lines:false }
  function add(
    a: Ref<number> | number,
    b: Ref<number> | number
  ) {
    return computed(() => unref(a) + unref(b))
  }
```

