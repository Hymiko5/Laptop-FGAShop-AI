// userName: { type: String, required: [true, "can't be blank"], index: true },
// email: { type: String, required: [true, "can't be blank"], unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
// phoneNumber: { type: String, match: [/^\+[0-9]{2,4}-[0-9]{8,11}$/, 'invalid phone number'] },
// photo: { type:String, default: 'public/avatar_author.jpg' },
// password: { type: String },
// facebook: {
//     id: String,
//     displayName: String,
//     email: String,
//     photo: String
// },
// google: {
//     id: String,
//     displayName: String,
//     email: String,
//     photo: String
// },
// isAdmin: {
//     type: Boolean,
//     default: false
// }
export const userInputs = [
  {
    id: 1,
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    id: 2,
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: 3,
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your Phone number",
  },
  {
    id: 4,
    label: "Password",
    type: "password",
  }
];

export const productInputs = [
  {
    id: 1,
    label: "Laptop Name",
    type: "text",
    placeholder: "Laptop Name",
  },
  // {
  //   id: 2,
  //   label: "Thumnail",
  //   type: "file",
  //   placeholder: "Thumnails",
  // },
  {
    id: 3,
    label: "Guide",
    type: "text",
    placeholder: "Guide",
  },
  {
    id: 4,
    label: "Price",
    type: "text",
    placeholder: "Price",
  },
  {
    id: 5,
    label: "Installment",
    type: "text",
    placeholder: "Installment",
  },
  {
    id: 6,
    label: "CPU information",
    type: "text",
    placeholder: "CPU information",
  },
  {
    id: 7,
    label: "RAM information",
    type: "text",
    placeholder: "RAM information",
  },
  {
    id: 8,
    label: "Hardware information",
    type: "text",
    placeholder: "Hardware information",
  },
  {
    id: 9,
    label: "Monitor information",
    type: "text",
    placeholder: "Installment",
  },
  {
    id: 10,
    label: "Graphic card information",
    type: "text",
    placeholder: "Graphic card information",
  },
  {
    id: 11,
    label: "Connector information",
    type: "text",
    placeholder: "Connector information",
  },
  {
    id: 12,
    label: "Operation information",
    type: "text",
    placeholder: "Operation information",
  },
  {
    id: 13,
    label: "Design information",
    type: "text",
    placeholder: "Design information",
  },
  {
    id: 14,
    label: "Dimensions, weight",
    type: "text",
    placeholder: "Dimensions, weight",
  },
  {
    id: 15,
    label: "Release time",
    type: "text",
    placeholder: "Release time",
  },
  {
    id: 16,
    label: "Online price",
    type: "text",
    placeholder: "Online price",
  },
  {
    id: 19,
    label: "Gift-amount",
    type: "text",
    placeholder: "Gift-amount",
  },
  {
    id: 20,
    label: "Gift-expire",
    type: "text",
    placeholder: "Gift-expire",
  },
  {
    id: 21,
    label: "Promotion",
    type: "text",
    placeholder: "Promotion",
  },
  {
    id: 22,
    label: "Laptop detail",
    type: "text",
    placeholder: "Laptop detail",
  },
  {
    id: 23,
    label: "Short Name",
    type: "text",
    placeholder: "Short Name",
  },
  // {
  //   id: 23,
  //   label: "Is business?",
  //   type: "select",
  //   placeholder: "Is business?",
  // },
  {
    id: 24,
    label: "Slug",
    type: "text",
    placeholder: "Slug",
  },
  {
    id: 25,
    label: "Quantity",
    type: "text",
    placeholder: "Quantity",
  },
];

export const pluginInputs = [
  {
    id: 1,
    label: "Name",
    type: "text",
    placeholder: "Enter the plugin name",
  },
  {
    id: 2,
    label: "Online price",
    type: "text",
    placeholder: "Enter the online price",
  }
];

export const orderInputs = [
  {
    id: 1,
    label: "Provincial",
    type: "text",
    placeholder: "Provincial",
  },
  {
    id: 2,
    label: "District",
    type: "text",
    placeholder: "Enter the online price",
  },
  {
    id: 3,
    label: "Ward",
    type: "text",
    placeholder: "Enter the online price",
  },
  {
    id: 4,
    label: "Address",
    type: "text",
    placeholder: "Enter the online price",
  }
];