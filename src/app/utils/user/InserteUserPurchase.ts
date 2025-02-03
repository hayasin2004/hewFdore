import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const InsertProductSellStatus = async () => {
    await connectDB();
    try {
        const test = await User.findOne({email : "test1@test.test"})
        console.log(test)
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default InsertProductSellStatus;

