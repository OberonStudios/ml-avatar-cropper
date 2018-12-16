import face_recognition
from PIL import Image, ImageDraw
import sys

# my_file = 'photo-1544938949944.jpeg'
my_file = str(sys.argv[1])

in_image = face_recognition.load_image_file('./media/'+my_file)

out_image = Image.fromarray(in_image)

out_image_w, out_image_h = out_image.size

face_locations = face_recognition.face_locations(in_image)

for (top, right, bottom, left) in face_locations:
    if(out_image_h>out_image_w):
      out_image=out_image.crop((left-(out_image_h*.17), top-(out_image_h*.17), right+(out_image_h*.17), bottom+(out_image_h*.17)))
    else:
      out_image=out_image.crop((left-(out_image_w*.2), top-(out_image_w*.2), right+(out_image_w*.2), bottom+(out_image_w*.2)))

out_image.save('./media/'+my_file)