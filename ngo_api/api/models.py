from django.db import models

class CategoryOrganization(models.Model):
    name = models.CharField(max_length=255, blank=False)
    bio = models.TextField(null=False)
    image = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class CategoryProject(models.Model):
    name = models.CharField(max_length=255, blank=False)
    bio = models.TextField(blank=False)
    image = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Company(models.Model):
    name = models.CharField(max_length=500, blank=False)
    bio = models.TextField(max_length=5000, blank=False)
    localization = models.CharField(max_length=255, blank=False)
    mail = models.EmailField(max_length=255, blank=False)
    phone = models.CharField(max_length=20, blank=True)
    web = models.URLField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=False)
    zip = models.CharField(max_length=6, blank=False)
    city = models.CharField(max_length=255, blank=False)
    voivodeship = models.CharField(max_length=255, blank=False)
    district = models.CharField(max_length=255, blank=False)
    additional_info = models.TextField(blank=True)
    image = models.CharField(max_length=255, blank=True)
    category = models.OneToOneField(CategoryProject, on_delete=models.CASCADE)
    krs = models.CharField(max_length=20, blank=False)
    partnership = models.ManyToManyField('Ngo', related_name='partners')

    def __str__(self):
        return self.name


class Budget(models.Model):
    name = models.CharField(max_length=255, blank=False)
    aim = models.TextField(blank=False)
    budget = models.CharField(max_length=255, blank=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Grant(models.Model):
    company = models.OneToOneField(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=False)
    creation_date = models.DateField(auto_now_add=True, blank=True)
    end_date = models.DateField(blank=True)
    conditions = models.TextField(blank=False)
    budget = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return self.name


class Ngo(models.Model):
    name = models.CharField(max_length=500, blank=False)
    bio = models.TextField(max_length=10000, blank=True)
    localization = models.CharField(max_length=255, blank=False)
    mail = models.EmailField(max_length=255, blank=False)
    phone = models.CharField(max_length=20, blank=True)
    web = models.URLField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=False)
    zip = models.CharField(max_length=6, blank=False)
    city = models.CharField(max_length=255, blank=False)
    voivodeship = models.CharField(max_length=255, blank=False)
    district = models.CharField(max_length=255, blank=False)
    additional_info = models.TextField(blank=True)
    image = models.CharField(max_length=255, blank=True)
    category = models.OneToOneField(CategoryOrganization, on_delete=models.CASCADE)
    krs = models.CharField(max_length=20, blank=True)
    partnership = models.ManyToManyField(Company, related_name='ngos', blank=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=255, blank=False)
    ngo = models.ManyToManyField(Ngo, related_name='projects')
    company = models.ManyToManyField(Company, related_name='projects', blank=True)
    bio = models.TextField(max_length=5000, blank=False)
    found = models.CharField(max_length=255, blank=False)
    is_active = models.BooleanField(default=True, blank=True)
    start_date = models.DateField(blank=True)
    end_date = models.DateField(blank=True)
    image = models.CharField(max_length=255, blank=True)
    category = models.OneToOneField(CategoryProject, on_delete=models.CASCADE)
    contact = models.CharField(max_length=255, blank=True)
    raport = models.TextField(blank=True)

    def __str__(self):
        return self.bio
