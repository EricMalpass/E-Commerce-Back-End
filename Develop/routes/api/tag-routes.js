const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include : [
      {
        model: Product,
        through: ProductTag
      }

    ]
  })
  .then ((product) => res.json(product));
  //res.status(200).json(ProductData);
  // be sure to include its associated Category and Tag data
});
  // be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id);
    if (!tagData) {
      res.status(404).json({message: "Tag not found!"});
    }
    res.status(200).json(tagData);
  
  }catch (err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try{
    const tagData =  Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })   
});


router.delete('/:id', (req, res) => {
  try {
    const tagdata = Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
