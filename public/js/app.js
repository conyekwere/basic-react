class ProductList extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  handleProductUpVote = (productId) => {
    const yesProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: yesProducts,
    });
  };

  handleProductDownVote = (productId) => {
    const noProducts = this.state.products.map((product) => {
      if (product.id === productId && product.votes > 0) {
        return Object.assign({}, product, {
          votes: product.votes - 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: noProducts,
    });
  };

  clearProductUpVote = (productId) => {
    const clearProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: (product.votes = 0),
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: clearProducts,
    });
  };

  render() {
    const products = this.state.products.sort((a, b) => b.votes - a.votes);
    const productComponents = products.map((product) => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
        onReset={this.clearProductUpVote}
        onDownVote={this.handleProductDownVote}
      />
    ));
    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  handleUpVote = () => this.props.onVote(this.props.id);
  clearUpVote = () => this.props.onReset(this.props.id);
  handleDownVote = () => this.props.onDownVote(this.props.id);

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            <a onClick={this.handleDownVote}>
              <i className="large caret down icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
        <a onClick={this.clearUpVote}>
          <i className="large undo icon compact circular" />
        </a>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
