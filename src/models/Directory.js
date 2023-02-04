class Directory {

  constructor(parent, name) {
    this.parent = parent;
    if (this.parent !== null) {
        this.parent.children[name] = this;
    }
    this.name = name;
    this.children = {};
  }
  
  get(arr) {
    let dir = this;
    if (arr.length > 0) {
      if (this.children.hasOwnProperty(arr[0])) {
        dir = this.children[arr[0]].get(arr.slice(1));
      } else {
        throw arr[0] + ' does not exist';
      }
    }
    return dir;
  }

  create(path) {
    let arr = path.split('/');
    let subdir = this.get(arr.slice(0, arr.length - 1));
    let child = new Directory(subdir, arr.slice(-1));
    return child;
  }

  delete(path) {
    try {
      let subdir = this.get(path.split('/'));
      delete subdir.parent.children[subdir.name];
      return subdir;
    } catch (exc) {
      console.log("Cannot delete "+path+" - "+exc);
    }
  }

  move(fromPath, toPath) {
    let from = this.delete(fromPath);
    let to = this.get(toPath.split('/'));
    from.parent = to;
    to.children[from.name] = from;
  }

  list(indent) {
    let incr = ' ';
    let buf = '';
    if (this.name !== null) {
      buf += indent + this.name + '\n';
    } else {
      incr = '';
    }
    Object.keys(this.children)
      .sort()
      .forEach((key) => {
        buf += this.children[key].list(indent + incr);
      });
      return buf;
    }
  }

  module.exports = Directory;
