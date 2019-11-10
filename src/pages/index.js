import Loading from "@common/Loading";
import reactLoadable from "react-loadable"

const Home = reactLoadable({
    loader:()=>import("./Home"),
    loading:Loading
})
export {
    Home
}