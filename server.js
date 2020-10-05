const express = require('express')
const cors = require("cors")
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} = require('graphql')

const couriers = [
  {
    id: "ckerkubem04aq07087wy956x5",
    name: "Ahmed",
    latitude: 36.8386636,
    longitude: 10.2392804,
  },
  {
    id: "ckerkubem04aq07087wy956x5",
    name: "Chakib",
    latitude: 36.8386636,
    longitude: 10.2392804,
  }
]

const customers = [
  {
    name: "Karim L.",
    fullAddress: "Tunis, Tunisia",
    id: "ckerkubem04aq07087wy956x5",
    latitude: 36.8386634,
    longitude: 10.2392804,
    phoneNumber: "11111111",
  },
  {
    name: "Samar B.",
    fullAddress: "Tunis, Tunisia",
    id: "ckerkubem04aq07087wy956x5",
    latitude: 36.8386634,
    longitude: 10.2392804,
    phoneNumber: "11111111",
  },
  {
    name: "Manel B.",
    fullAddress: "Tunis, Tunisia",
    id: "ckerkubem04aq07087wy956x5",
    latitude: 36.8386634,
    longitude: 10.2392804,
    phoneNumber: "11111111",
  }
]

const orders = [
  {
    courierName: null,
    customerName: "Karim L.",
    id: "ckerkubcm04aj07088iq517b21",
    orderItems: [
      {
        id: "ckerkubdh04ak07084vr8oa7y",
        name: "Sandwich Latino",
        price: 8.5,
      },
      {
        id: "ckerkube904an0708hjzzz53a",
        name: "Crispy Beef Chicken Onion Burger",
        price: 9,
      },
    ],
    orderType: "DELIVERY",
    reference: "882178960",
    restaurantId: "cjn94mdtq4qr50b68pppdf116",
    status: "NEW",
  },
  {
    courierName: "Ahmed",
    customerName: "Samar B.",
    id: "ckerkubcm04aj07088iq517b22",
    orderItems: [
      {
        id: "ckerkubdh04ak07084vr8oa7y",
        name: "Sandwich Fermier",
        price: 8.5,
      },
    ],
    orderType: "DELIVERY",
    reference: "882178961",
    restaurantId: "cjn94mdtq4qr50b68pppdf116",
    status: "EN_ROUTE",
  },
  {
    courierName: "Chakib",
    customerName: "Manel B.",
    id: "ckerkubcm04aj07088iq517b23",
    orderItems: [
      {
        id: "ckerkubdh04ak07084vr8oa7y",
        name: "Chicken Burger",
        price: 12,
      },
    ],
    orderType: "DELIVERY",
    reference: "882178961",
    restaurantId: "cjn94mdtq4qr50b68pppdf116",
    status: "DELIVERED",
  },
]

const restaurants = [
  {
    fullAddress: "Avenue de Hédi Nouira, Ariana 2001",
    id: "cjn94mdtq4qr50b68pppdf116",
    latitude: 36.8614427,
    logoImg: "https://files-bocui07th.vercel.app/download%20(1).png",
    longitude: 10.1642221,
    name: "Baguette & Baguette Ennaser",
  }
]


const CourierType = new GraphQLObjectType({
  name: 'Courier',
  description: 'This represents a courier',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat }
  })
})

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  description: 'This represents a customer',
  fields: () => ({
    name: { type: GraphQLString },
    fullAddress: { type: GraphQLString },
    id: { type: GraphQLNonNull(GraphQLString) },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    phoneNumber: { type: GraphQLInt }
  })
})

const OrderItem = new GraphQLObjectType({
  name: 'OrderItem',
  description: 'This represents an order Item',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    price: { type: GraphQLInt }
  })
})

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  description: 'This represents a restaurant',
  fields: () => ({
    fullAddress: { type: GraphQLString },
    id: { type: GraphQLNonNull(GraphQLString) },
    latitude: { type: GraphQLFloat },
    logoImg: { type: GraphQLString },
    longitude: { type: GraphQLFloat },
    name: { type: GraphQLString }
  })
})

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'This represents order',
  fields: () => ({
    courierName: { type: GraphQLString },
    courier: {
      type: CourierType,
      resolve: (order) => {
        return couriers.find(courier => courier.name === order.courierName)
      }
    },
    customerName: { type: GraphQLString },
    customer: {
      type: CustomerType,
      resolve: (order) => {
        return customers.find(customer => customer.name === order.customerName)
      }
    },
    id: { type: GraphQLNonNull(GraphQLString) },
    orderItems: { type: new GraphQLList(OrderItem) },
    orderType: { type: GraphQLString },
    reference: { type: GraphQLString },
    restaurantId: { type: GraphQLString },
    restaurant: {
      type: RestaurantType,
      resolve: (order) => {
        return restaurants.find(restaurant => restaurant.id === order.restaurantId)
      }
    },
    status: { type: GraphQLString },
  })
})



const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({

    orders: {
      type: new GraphQLList(OrderType),
      description: 'List of All Orders',
      resolve: () => orders
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

const app = express()

app.use(cors());

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))