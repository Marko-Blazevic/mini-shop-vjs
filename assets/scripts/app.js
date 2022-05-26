class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // price;
  // description;

  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
    this.description = desc;
  }
}

class ShoppingCart {
  items = [];

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, currItem) => prevValue + currItem.price,
      0
    );
    return sum;
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total price: \$${this.totalAmount}</h2>`;
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.className = 'cart';
    cartEl.innerHTML = `
    <h2>Total price: \$${0}</h2>
    <button>Order Now!</button>
    `;
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
    <div>
      <img src=${this.product.imageUrl} alt=${this.product.title}>
      <div class="product-item__content">
      <h2>${this.product.title}</h2>
      <h3>\$${this.product.price}</h3>
      <p>${this.product.description}</p>
      <button>Add To Cart</button>
    </div>
    `;
    const addToCartBtn = prodEl.querySelector('button');
    addToCartBtn.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'Pillow',
      'https://images.crateandbarrel.com/is/image/Crate/DownAltPillowInsert16inchSHS16/?$web_product_hero$&190411135006&wid=625&hei=625',
      19.99,
      'Soft Pillow'
    ),

    new Product(
      'Carpet',
      'https://secure.img1-fg.wfcdn.com/im/70112123/resize-h800-w800%5Ecompr-r85/6736/67360347/Midnight+Snack+24%2522+x+24%2522+Plush+Cut+Carpet+Tile.jpg',
      89.99,
      'Hairy Carpet'
    ),
  ];

  render() {
    const productList = document.createElement('ul');
    productList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      productList.append(prodEl);
    }
    return productList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
