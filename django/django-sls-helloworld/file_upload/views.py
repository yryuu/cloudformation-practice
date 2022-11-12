from django.http import HttpResponseRedirect
from django.shortcuts import render

from .forms import UploadFileForm
from django.http import HttpResponse
import boto3
import sys
import base64

# ------------------------------------------------------------------


def file_upload(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            s3 = boto3.client("s3", region_name='ap-northeast-1')
            try:
                bucket = 's3testbucket20221112'
                s3.put_object(
                    Body=file.read(), Bucket=bucket, Key="test.png")
                return HttpResponseRedirect('/success/url/')
            except Exception as e:
                print(e)

    else:
        form = UploadFileForm()
    return render(request, 'file_upload/upload.html', {'form': form})
#
#
# ------------------------------------------------------------------


def convert_b64_string_to_bynary(s):
    """base64をデコードする"""
    return base64.b64decode(s)


def handle_uploaded_file(file_obj):
    sys.stderr.write("*** handle_uploaded_file *** aaa ***\n")
    sys.stderr.write(file_obj.name + "\n")
    file_path = 'media/documents/' + file_obj.name
    sys.stderr.write(file_path + "\n")
    with open(file_path, 'wb+') as destination:
        for chunk in file_obj.chunks():
            sys.stderr.write("*** handle_uploaded_file *** ccc ***\n")
            destination.write(chunk)
            sys.stderr.write("*** handle_uploaded_file *** eee ***\n")
#
# ------------------------------------------------------------------


def success(request):
    str_out = "Success!<p />"
    str_out += "成功<p />"
    return HttpResponse(str_out)
# ------------------------------------------------------------------
