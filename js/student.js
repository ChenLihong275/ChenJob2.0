// 未登录无法打开页面
permissonControl('login.html')
// 渲染首页用户名
renderUsername()
// 点击退出跳转至登录页
logout('login.html')
// 渲染页面
const modal = new bootstrap.Modal(document.querySelector('.modal'))
async function renderStudent() {
  const res = await axios('/students')
  console.log(res)
  document.querySelector('.list').innerHTML = res.data
    .map(ele => {
      return `
      <tr>
        <td>${ele.name}</td>
        <td>${ele.age}</td>
        <td>${ele.gender === 1 ? '男' : '女'}</td>
        <td>${ele.group}</td>
        <td>${ele.salary}</td>
        <td>${ele.hope_salary}</td>
        <td>${ele.province}${ele.city}${ele.area}</td>
        <td data-id=${ele.id}>
            <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen"></i></a>
            <a href="javascript:;" class="text-danger"><i class="bi bi-trash"></i></a>
        </td>
      </tr>
      `
    })
    .join('')
  document.querySelector('.total').innerHTML = res.data.length
  document.querySelector('.list').addEventListener('click', async function (e) {
    if (e.target.classList.contains('bi-pen')) {
      modal.show()
      const id = e.target.parentNode.parentNode.dataset.id
      const res1 = await axios(`/students/${id}`)
      console.log(res1)
      Object.keys(res1.data).forEach(ele => {
        if (ele === 'createdAt' || ele === 'id' || ele === 'updatedAt' || ele === 'user_id') {
        } else if (ele === 'gender') {
        } else {
          console.log(document.querySelector(`[name=${ele}]`))
        }

        //   document.querySelector(`[name=${ele}]`)
      })

      //   document.querySelector()
    }
  })
}

renderStudent()
