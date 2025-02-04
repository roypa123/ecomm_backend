const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
const helperFunction = require("../utils/helper_functions/helperfunctions");
const Constants = require("../utils/constants");
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");

class UserModel {
  static async userExists(email) {
    console.log(email);
    const existingUser = knex("user").where({ email }).first();
    return existingUser;
  }

  static async createUser(userData) {
    const name = userData.name;
    const email = userData.email;
    const role = userData.role;
    const password = await helperFunction.hashPassword(userData.password);

    const currentTime = Date.now();
    const futureTime = currentTime + 5 * 60 * 1000;
    const otp = helperFunction.generateOTP();

    try {

      knex.transaction(async function (trx) {
        try {

        } catch (error) {
          await trx.rollback();
          console.error("Error inserting data:", error);

        } finally {
          // Close the database connection
          knex.destroy();

        }





      })







    } catch (error) {
      throw error
    }




    // const createdUser = await knex("user")
    //   .insert({ name, email, password })
    //   .returning([
    //     "user_id",
    //     "name",
    //     "email",
    //     "role",
    //   ]);

    // const createdUser1 = createdUser[0];
    // return createdUser1;

  }






  static async loginUser(userData) {
    const email = userData.email;
    const plainPassword = userData.password;
    const role = userData.role;

    console.log("sss");

    const userData1 = await knex("user")
      .select(
        "password",
        "apikey",
        "user_id",
        "first_name",
        "last_name",
        "role",
        "email",
        "payment_end_date"
      )
      .where({ email: email, role: role })
      .first();

    const comparePassword = await HelperFunction.comparePasswords(
      plainPassword,
      userData1.password
    );
    console.log(comparePassword);

    if (comparePassword) {
      return {
        user_id: userData1.user_id,
        first_name: userData1.first_name,
        last_name: userData1.last_name,
        email: userData1.email,
        role: userData1.role,
        apikey: userData1.apikey,
        payment_end_date: userData1.payment_end_date,
      };
    } else {
      return null;
    }
  }


}

module.exports = UserModel;