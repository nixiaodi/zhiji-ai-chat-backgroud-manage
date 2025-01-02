#!/bin/sh

# 脚本地址
script_dir=$(cd $(dirname $0);pwd)
root_dir="$script_dir/../"
dist_dir="$root_dir/dist"
tar_dir="$root_dir/tar"
# 部署目录

cd $root_dir

# yarn

pnpm build

#if [ ! -d $tar_dir ]; then
#mkdir $tar_dir
#fi


scp -r ./dist/* root@47.108.217.158:/wwwroot/admin.zairobot.com/

echo done!
