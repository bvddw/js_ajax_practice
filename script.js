const settings = {
    inputs: [
      [
        {'key': "class", value: "form-control input-number"},
        {'key': "type", value: "userId"},
        {'key': "id", value: "1"},
        {'key': "name", value: "userId"},
        {'key': "value", value: "1"},
        {'key': "readonly", value: true},
      ],
      [
        {'key': "class", value: "form-control input-text"},
        {'key': "type", value: "text"},
        {'key': "id", value: "2"},
        {'key': "name", value: "title"},
        {'key': "placeholder", value: "Enter title"},
        {'key': "minlength", value: 3},
        {'key': "maxlength", value: 255},
        {'key': "required", value: true},
      ],
      [
        {'key': "class", value: "form-control input-text"},
        {'key': "type", value: "text"},
        {'key': "id", value: "3"},
        {'key': "name", value: "body"},
        {'key': "placeholder", value: "Enter post"},
        {'key': "minlength", value: 3},
        {'key': "maxlength", value: 255},
        {'key': "required", value: true},
      ],
    ],
  }
  
  const settingsForComments = {
    inputs: [
      [
        {'key': "class", value: "form-control input-number"},
        {'key': "type", value: "text"},
        {'key': "id", value: "1"},
        {'key': "name", value: "name"},
        {'key': "placeholder", value: "Enter comment name"},
        {'key': "minlength", value: 3},
        {'key': "maxlength", value: 255},
        {'key': "required", value: true},
      ],
      [
        {'key': "class", value: "form-control input-text"},
        {'key': "type", value: "text"},
        {'key': "id", value: "2"},
        {'key': "name", value: "email"},
        {'key': "placeholder", value: "Enter email"},
        {'key': "minlength", value: 3},
        {'key': "maxlength", value: 255},
        {'key': "required", value: true},
      ],
      [
        {'key': "class", value: "form-control input-text"},
        {'key': "type", value: "text"},
        {'key': "id", value: "3"},
        {'key': "name", value: "body"},
        {'key': "placeholder", value: "Enter body"},
        {'key': "minlength", value: 3},
        {'key': "maxlength", value: 255},
        {'key': "required", value: true},
      ],
    ],
  }
  
  class PostPage {
    constructor() {
      let inputsDiv = document.createElement('div')
      inputsDiv.className = "input-group mb-3 grid text-center"
      inputsDiv.style.justifyContent = 'center'
      this.inputsForm = new myDiv(settings)
      inputsDiv.appendChild(this.inputsForm.htmlDiv)
  
      this.postsDiv = document.createElement('div') // div for displaying posts
      this.postsDiv.className = 'accordion'
      this.postsDiv.id = 'accordionExample'
      this.createHTML()
      document.body.appendChild(inputsDiv)
      document.body.appendChild(this.postsDiv)
      this.posts = []
    }
  
    createHTML() {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: (postData) => {
          postData.forEach((post) => {
            let newPost = new Post(post)
            this.posts.push(newPost)
            newPost.htmlPost.style.marginTop = '0'
            this.postsDiv.appendChild(newPost.htmlPost)
          })
        }
      })
  
      this.inputsForm.btn.addEventListener("click", () => {
        let inputTitle = this.inputsForm.inputs[1]
        let inputBody = this.inputsForm.inputs[2]
        if (inputTitle.value !== '' && inputBody.value !== '') {
          let body = {'id': this.posts.length + 1}
          this.inputsForm.inputs.forEach(input => {
            body[input.name] = input.value
            if (!input.readOnly) {
              input.value = ""
            }
          })
          $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'POST',
            data: JSON.stringify(body),
            dataType: 'json',
            contentType: 'application/json',
            success: (postData) => {
                let post = new Post(postData)
                this.postsDiv.appendChild(post.htmlPost)
                this.posts.push(post)
            }
          })
        }
      })
    }
  }
  
  class Post {
    constructor({userId, id, title, body}) {
      let inputsDiv = document.createElement('div')
      inputsDiv.className = "input-group mb-3 grid text-center"
      inputsDiv.style.justifyContent = 'center'
      this.inputsForm = new myDiv(settingsForComments)
      inputsDiv.appendChild(this.inputsForm.htmlDiv)
  
      this.userId = userId
      this.id = id
      this.title = title
      this.body = body
      this.comments = []
      this.htmlPost = this.renderPost() // here is div for current post
      this.htmlPost.className = 'accordion-item'
      this.htmlPost.style.textAlign = 'center'
    }
  
    renderPost() {
      let div = document.createElement('div')
      div.style.backgroundColor = 'rgba(0, 0, 0, 0.12)'
      div.style.borderRadius = '36px'
      div.style.textAlign = 'center'
      let header = document.createElement('h2')
      header.className = 'accordion-header'
      let postHeader = document.createElement('h1')
      postHeader.innerText = 'POST'
      postHeader.style.marginBottom = '0'
      postHeader.style.marginTop = '36px'
      let commentsHeader = document.createElement('h2')
      commentsHeader.innerText = 'COMMENTS'
      commentsHeader.style.marginBottom = '0'
      commentsHeader.style.marginTop = '36px'
      let button = document.createElement('button')
      button.className = 'accordion-button'
      button.type = 'button'
      button.setAttribute('data-bs-toggle', 'collapse')
      button.setAttribute('data-bs-target', `#collapse${this.id}`)
      button.setAttribute('aria-expanded', 'false')
      button.setAttribute('aria-controls', `collapse${this.id}`)
      let title = document.createElement('p')
      title.innerText = this.title
      let body = document.createElement('p')
      body.innerText = this.body
      button.innerHTML = `<div><strong>${title.innerText}</strong><p>${body.innerText}</p></div>`
      let activeDiv = document.createElement('div')
      activeDiv.style.marginTop = '6px'
      let changeBtn = document.createElement('button')
      changeBtn.innerText = 'Change'
      changeBtn.className = 'btn btn-info'
      changeBtn.style.padding = '2px 4px 2px 4px'
      changeBtn.style.marginRight = '2px'
  
      let deleteBtn = document.createElement('button')
      deleteBtn.innerText = 'Delete'
      deleteBtn.className = 'btn btn-warning'
      deleteBtn.style.padding = '2px 6px 2px 6px'
      activeDiv.appendChild(changeBtn)
      activeDiv.appendChild(deleteBtn)
      header.appendChild(button)
      div.appendChild(activeDiv)
      div.appendChild(header)
  
      let mainComment = document.createElement('div')
      mainComment.id = `collapse${this.id}`
      mainComment.className = 'accordion-collapse collapse'
      mainComment.setAttribute('data-bs-parent', '#accordionExample')
      let commentTextDiv = document.createElement('div')
      commentTextDiv.className = 'accordion-body'
      commentTextDiv.appendChild(this.inputsForm.htmlDiv)
      mainComment.appendChild(commentsHeader)
      mainComment.appendChild(commentTextDiv)
      $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/${this.id}/comments`,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: (comments) => {
          comments.forEach((comment, index) => {
            let newComment = new Comment(comment, index + 1)
            this.comments.push(newComment)
            commentTextDiv.appendChild(newComment.htmlComment)
          })
        }
      })
  
  
      div.appendChild(mainComment)
  
      const data = [this.userId, this.id, this.title, this.body]
  
      changeBtn.addEventListener('click', () => {
        let inputsDiv = document.createElement('div')
        inputsDiv.style.width = '1200px'
        let inputTitle = document.createElement('input')
        inputTitle.value = data[2]
        inputTitle.className = 'form-control'
        inputTitle.style.marginTop = '6px'
        let inputBody = document.createElement('input')
        inputBody.value = data[3]
        inputBody.className = 'form-control'
        inputBody.style.marginTop = '6px'
        activeDiv.innerText = ''
        inputsDiv.appendChild(inputTitle)
        inputsDiv.appendChild(inputBody)
        button.innerText = ''
        button.appendChild(inputsDiv)
        let saveBtn = document.createElement('button')
        saveBtn.innerText = 'Save'
        saveBtn.innerText = 'save'
        saveBtn.className = 'btn btn-success'
        saveBtn.style.padding = '2px 6px 2px 6px'
        saveBtn.style.marginTop = '6px'
  
        let cancelBtn = document.createElement('button')
        cancelBtn.innerText = 'Cancel'
        cancelBtn.className = 'btn btn-secondary'
        cancelBtn.style.padding = '2px 4px 2px 4px'
        cancelBtn.style.marginTop = '6px'
  
        activeDiv.style.alignItems = 'center'
        activeDiv.appendChild(saveBtn)
        activeDiv.appendChild(cancelBtn)
  
        cancelBtn.addEventListener('click', () => {
          button.innerText = ''
          button.innerHTML = `<div><strong>${title.innerText}</strong><p>${body.innerText}</p></div>`
          activeDiv.innerText = ''
          activeDiv.appendChild(changeBtn)
          activeDiv.appendChild(deleteBtn)
          data[2] = title.textContent
          data[3] = body.textContent
          this.title = body.textContent
          this.body = body.textContent
        })
  
        saveBtn.addEventListener('click', () => {
          data[2] = inputTitle.value
          data[3] = inputBody.value
          $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts/${this.id}`,
            type: 'PATCH',
            data: JSON.stringify({ title: data[2], body: data[3] }),
            contentType: 'application/json',
            success: (newData) => {
              title.innerText = newData.title
              body.innerText = newData.body
              this.title = newData.title
              this.body = newData.body
              button.innerText = ''
              button.innerHTML = `<div><strong>${title.innerText}</strong><p>${body.innerText}</p></div>`
  
              activeDiv.innerText = ''
              activeDiv.appendChild(changeBtn)
              activeDiv.appendChild(deleteBtn)
              data[2] = title.textContent
              data[3] = body.textContent
              this.title = body.textContent
              this.body = body.textContent
            }
          })
        })
      })
  
      deleteBtn.addEventListener('click', () => {
        $.ajax({
          url: `https://jsonplaceholder.typicode.com/posts/${this.id}`,
          type: 'DELETE',
          success: () => {
            div.innerText = ''
            this.comments.length--
          }
        })
      })
  
      this.inputsForm.btn.addEventListener("click", () => {
        let inputName = this.inputsForm.inputs[0]
        let inputEmail = this.inputsForm.inputs[1]
        let inputBody = this.inputsForm.inputs[2]
        if (inputName.value !== '' && inputEmail.value !== '' && inputBody.value !== '') {
          let body = {'postId': this.id, 'id': this.id * 6 + this.comments.length + 1}
          this.inputsForm.inputs.forEach(input => {
            body[input.name] = input.value
            if (!input.readOnly) {
              input.value = ""
            }
          })
          $.ajax({
            url: 'https://jsonplaceholder.typicode.com/comments',
            type: 'POST',
            data: JSON.stringify(body),
            dataType: 'json',
            contentType: 'application/json',
            success: (postData) => {
              let comment = new Comment(postData, this.comments.length + 1)
              this.comments.push(comment)
              commentTextDiv.appendChild(comment.htmlComment)
            }
          })
        }
      })
  
      return div
    }
  }
  
  
  class Comment {
    constructor({postId, id, name, email, body}, numberOfComment) {
      this.postId = postId
      this.id = id
      this.name = name
      this.email = email
      this.body = body
      this.numberOfComment = numberOfComment
      this.toLink = (this.postId - 1) * 5 + this.numberOfComment
      this.htmlComment = this.renderComments() // here is div for current comment
    }
  
    renderComments() {
      let div = document.createElement('div')
      div.style.marginBottom = '10px'
      let commentHeader = document.createElement('p')
      commentHeader.style.fontWeight = '700'
      commentHeader.innerText = `${this.numberOfComment}`
      let name = document.createElement('p')
      name.innerText = this.name
      let email = document.createElement('p')
      email.innerText = this.email
      email.style.fontWeight = '500'
      let body = document.createElement('p')
      body.innerText = this.body
      let buttonsDiv = document.createElement('div')
      let changeBtn = document.createElement('button')
      changeBtn.innerText = 'Change'
      changeBtn.className = 'btn btn-info'
      changeBtn.style.marginRight = '6px'
      let deleteBtn = document.createElement('button')
      deleteBtn.innerText = 'Delete'
      deleteBtn.className = 'btn btn-warning'
      buttonsDiv.appendChild(changeBtn)
      buttonsDiv.appendChild(deleteBtn)
  
      div.appendChild(commentHeader)
      div.appendChild(name)
      div.appendChild(body)
      div.appendChild(email)
      div.appendChild(buttonsDiv)
  
      changeBtn.addEventListener('click', () => {
        let inputsDiv = document.createElement('div')
        inputsDiv.style.display = 'grid'
        let inputName = document.createElement('input')
        inputName.value = name.textContent
        inputName.className = 'form-control'
        inputName.style.marginTop = '6px'
        let inputBody = document.createElement('input')
        inputBody.value = body.textContent
        inputBody.className = 'form-control'
        inputBody.style.marginTop = '6px'
        let inputEmail = document.createElement('input')
        inputEmail.value = email.textContent
        inputEmail.className = 'form-control'
        inputEmail.style.marginTop = '6px'
        buttonsDiv.innerText = ''
        inputsDiv.appendChild(inputName)
        inputsDiv.appendChild(inputBody)
        inputsDiv.appendChild(inputEmail)
        div.innerText = ''
  
        let saveBtn = document.createElement('button')
        saveBtn.innerText = 'Save'
        saveBtn.innerText = 'save'
        saveBtn.className = 'btn btn-success'
        saveBtn.style.padding = '2px 6px 2px 6px'
        saveBtn.style.marginTop = '6px'
        saveBtn.style.marginRight = '6px'
  
        let cancelBtn = document.createElement('button')
        cancelBtn.innerText = 'Cancel'
        cancelBtn.className = 'btn btn-secondary'
        cancelBtn.style.padding = '2px 4px 2px 4px'
        cancelBtn.style.marginTop = '6px'
  
        buttonsDiv.appendChild(saveBtn)
        buttonsDiv.appendChild(cancelBtn)
        buttonsDiv.style.alignItems = 'center'
        div.appendChild(commentHeader)
        div.appendChild(inputsDiv)
        div.appendChild(buttonsDiv)
  
        cancelBtn.addEventListener('click', () => {
          div.innerText = ''
          buttonsDiv.innerText = ''
          buttonsDiv.appendChild(changeBtn)
          buttonsDiv.appendChild(deleteBtn)
          div.appendChild(commentHeader)
          div.appendChild(name)
          div.appendChild(body)
          div.appendChild(email)
          div.appendChild(buttonsDiv)
        })
  
        saveBtn.addEventListener('click', () => {
          $.ajax({
            url: `https://jsonplaceholder.typicode.com/comments/${this.toLink}`,
            type: 'PATCH',
            data: JSON.stringify({name: inputName.value, email: inputEmail.value, body: inputBody.value}),
            contentType: 'application/json',
            success: (newData) => {
              name.innerText = newData.name
              body.innerText = newData.body
              email.innerText = newData.email
              this.name = newData.name
              this.body = newData.body
              this.email = newData.email
  
              div.innerText = ''
              buttonsDiv.innerText = ''
              buttonsDiv.appendChild(changeBtn)
              buttonsDiv.appendChild(deleteBtn)
              div.appendChild(commentHeader)
              div.appendChild(name)
              div.appendChild(body)
              div.appendChild(email)
              div.appendChild(buttonsDiv)
            }
          })
        })
      })
  
      deleteBtn.addEventListener('click', () => {
        $.ajax({
          url: `https://jsonplaceholder.typicode.com/comments/${this.toLink}`,
          type: 'DELETE',
          success: () => {
            div.innerText = ''
          }
        })
      })
      return div
    }
  }
  
  class myDiv {
    constructor(settings) {
      this.inputs = []
      this.htmlDiv = document.createElement("div")
      this.htmlDiv.style.justifyItems= 'center'
      this.htmlDiv.style.display = 'grid'
      this.htmlDiv.style.paddingTop = '20px'
      this.htmlDiv.style.marginBottom = '20px'
      this.btn = document.createElement("button")
      this.createHtml()
      settings.inputs.forEach(inputParams => this.addInput(inputParams))
      this.addBtn()
    }
  
    createHtml() {
      let header = document.createElement('h2')
      header.style.color = 'white'
      header.innerText = 'Add Post'
      header.style.color = 'Black'
      header.style.marginBottom = '16px'
      this.htmlDiv.appendChild(header)
    }
  
    addInput(params) {
      let input = document.createElement("input")
      params.map(item => {
        input.setAttribute(item.key, item.value)
      })
      input.style.borderWidth = '1px'
      input.style.borderColor = 'black'
      let p = document.createElement('p')
      p.style.marginLeft = '6px'
      p.style.marginTop = '6px'
      p.style.color = 'red'
      input.addEventListener('focus', (event) => {
        if (input.required && input.value === '') {
            p.innerText = `input ${input.name} can't be empty`
          } else {
            p.innerText = ''
        }
      })
      input.addEventListener('change', (event) => {
        if (input.required && input.value === '') {
            p.innerText = `input ${input.name} can't be empty`
          } else {
            p.innerText = ''
        }
      })
      this.htmlDiv.appendChild(input)
      this.inputs.push(input)
      this.htmlDiv.appendChild(p)
    }
  
    addBtn() {
      this.btn.type = "submit"
      this.btn.id = "submit"
      this.btn.className = "btn btn-success btn-sm"
      this.btn.innerText = "Submit"
      let div = document.createElement("div")
      div.appendChild(this.btn)
      div.className = "d-flex flex-row-reverse"
      this.htmlDiv.appendChild(div)
    }
  }
  let newPostPage = new PostPage()