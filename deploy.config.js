module.exports = {
  projectName: "vue3.0-vant3.0-vite2.0-llif",
  privateKey: "C:\\Users\\admin/.ssh/id_rsa",
  passphrase: "",
  cluster: [],
    dev: {
        name: "测试环境",
        script: "npm run test",
        host: "49.235.137.140",
        port: 22,
        username: "root",
        password: "Wang134245",
        distPath: "dist",
        webDir: "/usr/local/nginx/other",
        isRemoveRemoteFile: true
    },
    pro: {
        name: "开发环境",
        script: "npm run build",
        host: "49.235.137.140",
        port: 22,
        username: "root",
        password: "Wang134245",
        distPath: "dist",
        webDir: "/usr/local/nginx/other",
        isRemoveRemoteFile: true
    },
};
/**
 *
 *  deploy-cli-service init
 *  deploy-cli-service deploy --mode dev
 *
 *  http://192.168.70.205:7778
 */