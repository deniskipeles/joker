#!/bin/bash
echo "Enter the target directory "
read target_dir
cd $target_dir
 
echo "Enter the file extension to search without a dot"
read old_ext
 
echo "Enter the new file extension to rename to without a dot"
read new_ext
 
echo "$target_dir, $old_ext, $new_ext"
 
for file in *.$old_ext
do
    mv -v "$file" "${file%.$old_ext}.$new_ext"
done;
