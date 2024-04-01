import { sequelize } from "../../db/index";
import { DataTypes, Model, Optional } from "sequelize";

// This interface represents all possible attributes of a User model instance
export interface UserInterface {
  id?: number;
  name: string;
  username?: string;
  email?: string;
  age?: number;
  password: string;
}

interface UserCreationAttributes extends Optional<UserInterface, "id"> {}

interface UserInstance extends Model<UserInterface, UserCreationAttributes> {
  id?: number;
  name: string;
  username?: string;
  email?: string;
  age?: number;
  password: string;
}

export const User = sequelize.define<UserInstance>("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync().then(() => {
  console.log("User Model synced");
});
