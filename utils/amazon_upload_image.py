import boto3
from uuid import uuid4
import os
from typing import List

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_DEFAULT_REGION"),
)


def upload_to_s3(file, bucket_name: str, folder: str = "rents"):
    file_extension = file.filename.split(".")[-1]
    key = f"{folder}/{uuid4()}.{file_extension}"
    s3.upload_fileobj(file.file, bucket_name, key)
    url = f"https://{bucket_name}.s3.amazonaws.com/{key}"
    return url
