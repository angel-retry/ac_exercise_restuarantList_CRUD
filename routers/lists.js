const express = require('express')
const router = express.Router()

const db = require('../models')
const List = db.List


//搜尋資料要使用到的
const { Op } = require("sequelize");



//取得全餐廳清單
router.get('/', (req, res, next) => {
  const page = parseInt(req.query.page) || 1
  const limit = 9
  return List.findAll({
    attributes: ['id', 'image', 'name', 'category', 'rating'],
    raw: true,
    offset: (page - 1) * limit,
    limit
  })
    .then((lists) => res.render('lists', {
      lists,
      page,
      prev: page > 1 ? page - 1 : page,
      next: page + 1
    }))
    .catch((error) => {
      error.errorMessage = '取得資料失敗:('
      next(error)
    })
})

//取得新增清單頁
router.get('/new', (req, res) => {
  res.render('new')
})

//新增一家餐聽
router.post('/', (req, res, next) => {
  const alertMessage = "新增成功! 請至首頁查看。"
  const data = req.body
  return List.create({
    name: data.name,
    name_en: data.name_en,
    category: data.category,
    image: data.image,
    location: data.location,
    phone: data.phone,
    google_map: data.google_map,
    rating: data.rating,
    description: data.description,
  })
    .then(() => {
      req.flash('success', '新增成功')
      return res.redirect('/lists')
    })
    .catch((error) => {
      error.errorMessage = '新增失敗:('
      next(error)
    })
})

//取得一家餐廳頁面
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  return List.findByPk(id, {
    attributes: ['id', 'name', 'category', 'location', 'phone', 'description', 'image', 'rating', 'google_map'],
    raw: true
  })
    .then((list) => res.render('list', { list, message: req.flash('success') }))
    .catch((error) => {
      error.errorMessage = '取得資料失敗:('
      next(error)
    })
})

//取得修改一家餐廳頁面
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  return List.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((list) => res.render('edit', { list }))
    .catch((error) => {
      error.errorMessage = '無法取得修改資料:('
      next(error)
    })
})

//修改一家餐廳頁面內容
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const data = req.body
  return List.update({
    name: data.name,
    name_en: data.name_en,
    category: data.category,
    image: data.image,
    location: data.location,
    phone: data.phone,
    google_map: data.google_map,
    rating: data.rating,
    description: data.description,
  }, {
    where: {
      id
    }
  })
    .then(() => {
      req.flash('success', '更新成功')
      return res.redirect(`/lists/${id}`)
    })
    .catch((error) => {
      error.errorMessage = '無法取得資料:('
      next(error)
    })


})

//刪除一家資訊
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  return List.destroy({
    where: {
      id
    }
  })
    .then(() => {
      req.flash('success', '刪除成功')
      return res.redirect('/lists')
    })
    .catch((error) => {
      error.errorMessage = '無法刪除資料:('
      next(error)
    })
})

//搜尋功能
router.post('/search', (req, res, next) => {
  const keyword = req.body.keyword
  return List.findAll({
    attributes: ['id', 'image', 'name', 'category', 'rating'],
    raw: true,
    //使用Op來指應where條件
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${keyword}%`
          }
        },
        {
          category: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${keyword}%`,
          },
        }

      ]

    }
  })
    .then((lists) => lists.length === 0 ? res.redirect('/lists') : res.render('lists', { lists, keyword }))
    .catch((error) => {
      error.errorMessage = '無法搜尋:('
      next(error)
    })
})


module.exports = router