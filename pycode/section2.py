import numpy
from PIL import Image

arr = numpy.random.randint(0, 65536, size=(1000, 10000))
log_data = numpy.where(arr > 0, 10 * numpy.log10(arr), arr)
final_array = numpy.where(log_data < 13, 2 * log_data, arr)
print(final_array)
img = Image.fromarray(final_array, 'RGB')
img.save('output/my.png')
img.show()

#hopeing im right