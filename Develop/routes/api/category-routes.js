const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include : [
      Product 
    ]
  })
  .then ((category) => res.json(category));
  // find all categories
  // be sure to include its associated Products //how??
});

router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({message: "Category not found!"});
    }
    res.status(200).json(categoryData);
  
  }catch (err){
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products/// how
});

router.post('/', (req, res) => {
  try{
    const categoryData = Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  
  // create a new category
});

/*router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
});
*/

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const category = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
