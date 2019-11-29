const proxy = require("http-proxy-middleware");

module.exports = (app)=>{
    
    // 后端
    app.use(proxy("/api",{
        target:"http://172.16.10.61:8098",
        changeOrigin:true,
        pathRewrite:{
            "^/api":""
        }
    }))
    app.use(proxy("/check",{
        target:"http://172.16.10.61:8098",
        changeOrigin:true,
    }))

    // 阿里云
//     app.use(proxy("/api",{
//         target:"http://172.16.10.87:8098",
//         changeOrigin:true,
//         pathRewrite:{
//             "^/api":""
//         }
//     }))
//     app.use(proxy("/check",{
//         target:"http://172.16.10.87:8098",
//         changeOrigin:true,
//     }))

// 内网服务器
//     app.use(proxy("/api",{
//         target:"http://59.110.142.255:8098",
//         changeOrigin:true,
//         pathRewrite:{
//             "^/api":""
//         }
//     }))
//     app.use(proxy("/check",{
//         target:"http://59.110.142.255:8098",
//         changeOrigin:true,
//     }))


}



