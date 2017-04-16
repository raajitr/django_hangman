from PIL import Image
import glob

images = glob.glob('*.png')
print images
for count, i in enumerate(images):
	img = Image.open(i)
	img = img.convert("RGBA")
	datas = img.getdata()

	newData = []
	for item in datas:
	    if item[0] == 255 and item[1] == 255 and item[2] == 255:
	        newData.append((255, 255, 255, 0))
	    else:
	        newData.append(item)

	img.putdata(newData)
	img.save("img%s.png"%count, "PNG")