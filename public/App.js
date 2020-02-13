const initialProductList = [];

function ProductTable(props) {
  const productRows = props.productList.map(product => React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return React.createElement("table", {
    className: "bordered-table"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image"))), React.createElement("tbody", null, productRows));
}

function ProductRow(props) {
  const product = props.product;
  return React.createElement("tr", null, React.createElement("td", null, product.productName), React.createElement("td", null, "$" + product.price), React.createElement("td", null, product.category), React.createElement("td", null, React.createElement("a", {
    href: product.image
  }, "view")));
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultPrice: '$',
      categoryValue: '',
      URL: [{
        shirts: "https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609",
        jeans: "https://www.istockphoto.com/photo/blue-jeans-isolated-with-clipping-path-gm600373506-103229995",
        jackets: "https://www.istockphoto.com/photo/black-hoodie-mock-up-gm695933044-128721993",
        sweaters: "https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609",
        accessories: "https://www.shutterstock.com/image-vector/hair-accessories-woman-items-stylist-salon-1451306021"
      }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      productName: form.productName.value,
      category: form.category.value,
      price: form.price.value.replace(/\$/g, ""),
      image: form.image.value
    };
    this.props.createProduct(product);
    form.productName.value = "";
    form.category.value = "";
    this.setState({
      defaultPrice: '$',
      URL: [{
        shirts: "https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609",
        jeans: "https://www.istockphoto.com/photo/blue-jeans-isolated-with-clipping-path-gm600373506-103229995",
        jackets: "https://www.istockphoto.com/photo/black-hoodie-mock-up-gm695933044-128721993",
        sweaters: "https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609",
        accessories: "https://www.shutterstock.com/image-vector/hair-accessories-woman-items-stylist-salon-1451306021"
      }]
    }); //form.image.value="";
  }

  handleChange(e) {
    this.setState({
      defaultPrice: e.target.value
    });
  }

  render() {
    let btnClass = ['btn', 'clearfix'];
    btnClass = btnClass.join(' ');
    return React.createElement("div", null, React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit,
      className: "form"
    }, React.createElement("div", {
      className: "div1"
    }, "Category ", React.createElement("br", null), React.createElement("select", {
      name: "category",
      className: "selectBox",
      onChange: e => this.setState({
        categoryValue: e.target.value
      })
    }, React.createElement("option", {
      value: ""
    }), React.createElement("option", {
      value: "shirts"
    }, "Shirts"), React.createElement("option", {
      value: "jeans"
    }, "Jeans"), React.createElement("option", {
      value: "jackets"
    }, "Jackets"), React.createElement("option", {
      value: "sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "accessories"
    }, "Accessories")), React.createElement("br", null), React.createElement("br", null), "Product Name ", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "productName"
    }), React.createElement("br", null), React.createElement("br", null)), React.createElement("div", {
      className: "div2"
    }, "Price Per Unit ", React.createElement("br", null), React.createElement("input", {
      ref: "price",
      type: "text",
      name: "price",
      onChange: this.handleChange,
      value: this.state.defaultPrice
    }), React.createElement("br", null), React.createElement("br", null), "Image URL", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "image",
      defaultValue: this.state.URL[0][this.state.categoryValue] || ''
    }), React.createElement("br", null), React.createElement("br", null)), React.createElement("button", {
      className: btnClass
    }, "Add Product")));
  }

}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        productList: initialProductList
      });
    }, 500);
  }

  createProduct(product) {
    product.id = this.state.productList.length + 1;
    product.created = new Date();
    const newProductList = this.state.productList.slice();
    newProductList.push(product);
    this.setState({
      productList: newProductList
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("h1", null, "My Company Inventory"), React.createElement("h3", null, "Showing all available products"), React.createElement("hr", null), React.createElement(ProductTable, {
      productList: this.state.productList
    }), React.createElement("h3", null, "Add a new product to the inventory"), React.createElement("hr", null), React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('content'));