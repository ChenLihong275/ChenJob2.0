// 未登录无法打开页面
permissonControl('login.html')
// 渲染首页用户名
renderUsername()
// 点击退出跳转至登录页
logout('login.html')
// 渲染页面
const modal = document.querySelector('.modal')
const province = document.querySelector('[name=province]')
const city = document.querySelector('[name=city]')
const area = document.querySelector('[name=area]')
const title = document.querySelector('.modal-title')
const modalShow = new bootstrap.Modal(document.querySelector('.modal'))
async function renderStudent() {
  const res = await axios('/students')
  document.querySelector('.list').innerHTML = res.data
    .map(ele => {
      return `
      <tr>
        <td>${ele.name}</td>
        <td>${ele.age}</td>
        <td>${ele.gender === 1 ? '女' : '男'}</td>
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
}
renderStudent()
async function getArea() {
  const getProvince = await axios('/api/province')
  province.innerHTML = `<option value=''>--省份--</option>${getProvince.list.map(ele => `<option value='${ele}'>${ele}</option>`).join('')}`
  province.addEventListener('change', async function () {
    area.innerHTML = `<option value=''>--地区--</option>`
    const pname = this.value
    const getCity = await axios('/api/city', { params: { pname } })
    city.innerHTML = `<option value=''>--城市--</option>${getCity.list.map(ele => `<option value='${ele}'>${ele}</option>`).join('')}`
  })
  city.addEventListener('change', async function () {
    const pname = province.value
    const cname = this.value
    const getArea = await axios('/api/area', { params: { pname, cname } })
    area.innerHTML = `<option value=''>--地区--</option>${getArea.list.map(ele => `<option value='${ele}'>${ele}</option>`).join('')}`
  })
}
getArea()
// 点击编辑，打开模态框
document.querySelector('.list').addEventListener('click', async function (e) {
  if (e.target.classList.contains('bi-pen')) {
    title.innerHTML = '编辑学员'
    const id = e.target.parentNode.parentNode.dataset.id
    modal.dataset.id = id
    const res1 = await axios(`/students/${id}`)
    console.log(res1)
    Object.keys(res1.data).forEach(async key => {
      if (key === 'createdAt' || key === 'id' || key === 'updatedAt' || key === 'user_id') {
      } else if (key === 'gender') {
        document.querySelectorAll(`[name=${key}]`)[res1.data[key]].checked = true
      } else {
        document.querySelector(`[name=${key}]`).value = res1.data[key]
      }
    })
    const getProvince = await axios('/api/province')
    province.innerHTML = `<option value=''>--省份--</option>${getProvince.list.map(ele => `<option value='${ele}'>${ele}</option>`).join('')}`
    province.value = res1.data['province']
    const getCity = await axios('/api/city', { params: { pname: res1.data['province'] } })
    city.innerHTML = `<option value=''>--城市--</option>${getCity.list.map(ele => `<option value='${ele}'>${ele}</option>`).join('')}`
    city.value = res1.data['city']
    const getArea = await axios('/api/area', { params: { pname: res1.data['province'], cname: res1.data['city'] } })
    area.innerHTML = `<option value=''>--地区--</option>${getArea.list.map(ele => `<option value='${ele}'>${ele}</option>`).join('')}`
    area.value = res1.data['area']
    modalShow.show()
  }
})
// 点击模态框的增加

document.querySelector('#submit').addEventListener('click', async function () {
  const data = serialize(document.querySelector('#form'), { hash: true, empty: true })
  Object.keys(data).forEach(key => {
    if (key === 'age' || key === 'gender' || key === 'hope_salary' || key === 'salary' || key === 'group') {
      data[key] = +data[key]
    }
  })
  if (modal.dataset.id) {
    try {
      const res = await axios.put(`/students/${modal.dataset.id}`, data)
      toastShow(res.message)
    } catch (error) {
      // console.dir(error)
      toastShow('请输入必要的参数')
    }
    modal.dataset.id = ''
  } else {
    try {
      const res = await axios.post('/students', data)
      toastShow(res.message)
    } catch (error) {
      toastShow('请输入必要的参数')
    }
  }
  renderStudent()
  modalShow.hide()
})

// 点击删除
document.querySelector('.list').addEventListener('click', async function (e) {
  if (e.target.classList.contains('bi-trash')) {
    const id = e.target.parentNode.parentNode.dataset.id
    const res = await axios.delete(`/students/${id}`)
    toastShow(`已成功将${e.target.parentNode.parentNode.parentNode.children[0].innerText}删除`)
    renderStudent()
  }
})
// 点击增加人员，显示模态框
document.querySelector('.bi-plus').addEventListener('click', function () {
  modal.dataset.id = ''
  title.innerHTML = '添加学员'
  document.querySelector('#form').reset()
  modalShow.show()
})
