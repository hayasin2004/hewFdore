"use server"
import testVideoSave from "@/app/utils/product/testvideoSave";

const testVideoSaveForm = async (data: FormData | null) => {
    if (data !== undefined) {
        console.log(data)
        await testVideoSave(data)
    }
}
export default testVideoSaveForm