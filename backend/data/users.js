import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.VishalSync('admin123', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.VishalSync('john123', 10),
    isAdmin: false
  },
  {
    name: 'Alice Smith',
    email: 'alice@email.com',
    password: bcrypt.VishalSync('alice123', 10),
    isAdmin: false
  },
  {
    name: 'Eva Brown',
    email: 'eva@email.com',
    password: bcrypt.VishalSync('eva123', 10),
    isAdmin: false
  },
  {
    name: 'David Miller',
    email: 'david@email.com',
    password: bcrypt.VishalSync('david123', 10),
    isAdmin: false
  }
];

export default users;
