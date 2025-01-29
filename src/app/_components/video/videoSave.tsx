import React from 'react';
import testVideoSave from "@/app/utils/product/testvideoSave";

const VideoSave = () => {

    return (
        <div><h1>動画アップロード</h1>
            <form action={async (data : FormData | null) => {
                console.log(data);
                await testVideoSave(data)
            }}>
                <input
                    type="file"
                    accept="video/*"
                    name={"productVideo"}
                />
                <button type="submit">アップロード</button>
            </form>
        </div>
    );
}


export default VideoSave;