const {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const description = require('../../../lib/shema_description'); 
const searchModel = require('../../../models/searchModel');
const recipeInfo = require('../type/categories_type'); 
const searchOption = require('../type/category_search_option_type');
const searchKeys = require('../../share/input_target_search_key');

const InputType = new GraphQLInputObjectType({
  name: "searchCategories",
  description: description['SearchCategories'],
  fields: 
    { 
      page: { type: GraphQLID  },
      limit: { type: GraphQLID  },
      searchOption: { type: new GraphQLNonNull(searchOption) },
      //searchKey: { type: GraphQLString  }
      searchKeys: { type: new GraphQLList(searchKeys) }
    }
});

module.exports = {
  name: "searchResult",
  type: recipeInfo,
  args: {
    key: { type: new GraphQLNonNull(InputType) }
  },
  resolve: (obj, args, { pgPool }) => {
    return searchModel(pgPool).searchCategories(args.key);
  }
};
